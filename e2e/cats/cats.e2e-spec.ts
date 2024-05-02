import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { CatsService } from "../../src/cats/cats.service";
import { Cat } from "../../src/common/entity/cat.entity";
import { AppModule } from "../../src/app.module";
import { AuthService } from "../../src/auth/auth.service";

describe("Cats", () => {
  let app: INestApplication;
  let catsService: CatsService;
  let authService: AuthService;
  let dataSets = [
    { id: 1, name: "Luna", age: 1, breed: "Persian" },
    { id: 2, name: "Simba", age: 2, breed: "Siamese" },
    { id: 3, name: "Bella", age: 3, breed: "Abyssinian" },
    { id: 4, name: "Leo", age: 4, breed: "Bengal" },
  ];
  let bearerToken: string;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([Cat])],
      providers: [CatsService],
    }).compile();

    app = moduleRef.createNestApplication();
    catsService = moduleRef.get<CatsService>(CatsService);
    authService = moduleRef.get<AuthService>(AuthService);
    await app.init();
    // Reset test database
    await catsService.clearDatabase();
    await catsService.seedTestData();

    const { access_token } = await authService.login({
      username: "username",
      password: "password",
    });
    bearerToken = access_token;
  });

  it("should return all cats.", async () => {
    let result = await catsService.findAll();
    return request(app.getHttpServer())
      .get("/cats")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(200)
      .expect({
        data: dataSets,
      });
  });

  it("should return a cat.", async () => {
    return request(app.getHttpServer())
      .get("/cats/1")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(200)
      .expect({
        data: {
          id: 1,
          name: "Luna",
          age: 1,
          breed: "Persian",
        },
      });
  });

  it("should create new cat.", async () => {
    return request(app.getHttpServer())
      .post("/cats")
      .send({
        name: "Bob",
        age: 3,
        breed: "Bangal",
      })
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect(201)
      .expect({
        data: {
          id: 5,
          name: "Bob",
          age: 3,
          breed: "Bangal",
        },
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
