import bcrypt from "bcrypt";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "가입하기" });
export const postJoin = async (req, res) => {
    const { email, username, password1, password2, name, location } = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] });
    // $or operator -> mongoose 기능. array 내의 조건들을 or 로 판단해 결과 반환
    if (exists) {
        return res.status(400).render("join", { pageTitle: "가입하기", errorMessage: "이미 사용중인 이름/이메일 입니다." })
    };
    // status 400 을 보냄으로써 브라우저가 계정 생성에 실패함을 인식.(비밀번호 자동 저장 물음 X)
    if (password1 !== password2) {
        return res.status(400).render("join", { pageTitle: "가입하기", errorMessage: "비밀번호가 서로 일치하지 않습니다." })
    }
    try {
        await User.create({ email, username, password, name, location });
        res.redirect("/login");
    } catch (error) {
        res.status(404).render("join", { pageTitle: "가입하기", errorMessage: error._message })
    }
}
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "로그인";
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "계정이 존재하지 않습니다." })
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 틀립니다." })
    }
    return res.end();
};
export const logout = (req, res) => res.send("LogOut");
export const see = (req, res) => res.send("See");
