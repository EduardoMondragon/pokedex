import app from "../app";
import request from "supertest";

describe("CHECK REQUEST BLOCKER FOR EXCESS OF CALLS IN RANGE TIME", () => {
	it("Should protect server if rebase the autorized number of calls (100) per 15 minutes", async () => {
		// the request to be exec by supertest

		const uuid = "ed12ow";

		// fill the array with all allowed request  (100)
		const promises: Promise<request.Response>[] = Array.from({ length: 100 }, () =>
			request(app).post("/auth/login").send({ uuid })
		);

		// wait to exec all request
		const responses = await Promise.all(promises);

		// check status of each call
		responses.forEach((res, _index: number) => {
			expect(res.status).toBe(200); //should be successfull
		});

		// this is the 101 request and should be blocked by server
		const blockedResponse = await request(app).post("/auth/login").send({ uuid }).send({ uuid });

		expect(blockedResponse.status).toBe(429); //too many request code
		expect(blockedResponse.text.toLowerCase()).toContain("allowed request rebased");
		expect(blockedResponse.header["retry-after"]).not.toBeUndefined();
	});
});
