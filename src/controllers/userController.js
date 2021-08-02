import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "가입하기" });
export const postJoin = async (req, res) => {
    const { email, username, password, name, location } = req.body;
    await User.create({ email, username, password, name, location })
    res.redirect("/login");
}
export const edit = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("LogIn");
export const logout = (req, res) => res.send("LogOut");
export const see = (req, res) => res.send("See");
