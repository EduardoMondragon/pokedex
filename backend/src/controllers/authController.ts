import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
	try {
		const { uuid }: { uuid: string } = req.body;
		if (uuid) {
			res.status(200).json({ ok: true, message: "User Authorized.", uuid });
		} else {
			res.status(401).json({ ok: false, message: "User Unauthorized." });
		}
	} catch (error) {
		res.status(500).json({ ok: false, message: error });
	}
};

export default { login };
