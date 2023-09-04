import app from "../app";
import request from "supertest";

describe("simples test related with pruebasRoutes", () => {
  it("should show a saludo message", async () => {
    const res = await request(app).get("/test/saludito");
    // console.log(res);
    expect(res.status).toBe(200);
    expect(res.text).toContain("Hola");
  });

  it("Should protect API if rebase the autorized number of calls (50) per 15 minutes", async () => {
    // fill the array with all allowed request
    const promises: Promise<request.Response>[] = Array.from(
      { length: 99 },
      () => request(app).get("/test/saludito")
    );
    // make awaited functions
    const responses = await Promise.all(promises);
    // check status of each call
    responses.forEach((res, _index: number) => {
      expect(res.status).toBe(200); //should be successfull
    });
    // this request should be blocked
    const blockedResponse = await request(app).get("/test/saludito");
    expect(blockedResponse.status).toBe(429); //too many request code
    expect(blockedResponse.text.toLowerCase()).toContain(
      "allowed request rebased"
    );
    expect(blockedResponse.header["retry-after"]).not.toBeUndefined();
  });
});
