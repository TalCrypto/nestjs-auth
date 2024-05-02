import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../../src/config/database/database.module";
import { CatsModule } from "../../src/cats/cats.module";
import { CatsService } from "../../src/cats/cats.service";
import { CoreModule } from "../../src/core/core.module";
import { Cat } from "../../src/entity/cat.entity";

describe("Cats", () => {
  let app: INestApplication;
  let catsService: CatsService;
  let dataSets = [
    { id: 1, name: "Luna", age: 1, breed: "Persian" },
    { id: 2, name: "Simba", age: 2, breed: "Siamese" },
    { id: 3, name: "Bella", age: 3, breed: "Abyssinian" },
    { id: 4, name: "Leo", age: 4, breed: "Bengal" },
  ];

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forFeature([Cat]),
        CoreModule,
        CatsModule,
        DatabaseModule,
      ],
      providers: [CatsService],
    }).compile();

    app = moduleRef.createNestApplication();
    catsService = moduleRef.get<CatsService>(CatsService);
    await app.init();
    // Reset test database
    await catsService.clearDatabase();
    await catsService.seedTestData();
  });

  it(`/GET cats`, async () => {
    let result = await catsService.findAll();
    return request(app.getHttpServer()).get("/cats").expect(200).expect({
      data: dataSets,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
