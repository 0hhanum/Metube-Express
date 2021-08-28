import User from "../models/User";
import Video from "../models/Video";

import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => res.render("join", { pageTitle: "가입하기" });
export const postJoin = async (req, res) => {
    const { email, username, password, password2, name, location } = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] });
    // $or operator -> mongoose 기능. array 내의 조건들을 or 로 판단해 결과 반환
    if (exists) {
        return res.status(400).render("join", { pageTitle: "가입하기", errorMessage: "이미 사용중인 이름/이메일 입니다." })
    };
    // status 400 을 보냄으로써 브라우저가 계정 생성에 실패함을 인식.(비밀번호 자동 저장 물음 X)
    if (password !== password2) {
        return res.status(400).render("join", { pageTitle: "가입하기", errorMessage: "비밀번호가 서로 일치하지 않습니다." })
    }
    try {
        await User.create({ email, username, password, name, location });
        req.flash("info", "생성 완료!");
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.status(404).render("join", { pageTitle: "가입하기", errorMessage: error._message })
    }
}

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
}

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "로그인";
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "계정이 존재하지 않습니다." })
    }
    const ok = await bcrypt.compare(password, user.password);
    // 해시된 password 와 입력된 password 를 비교해줌.
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "비밀번호가 틀립니다." })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    req.flash("info", "환영합니다!");
    return res.redirect("/");
};

export const logout = (req, res) => {
    // req.session.destroy() 이렇게 하면 flash 가 세션에 접근 못함
    req.session.loggedIn = false;
    req.session.user = null;
    req.flash("info", "Have a good day!");
    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        scope: "read:user user:email"
    };
    const params = new URLSearchParams(config).toString();
    // config object 를 url 형식으로(client_id =...& scope=...) inconding 해줌
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        })).json();
    if ('access_token' in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            try {
                user = await User.create({
                    email: emailObj.email,
                    username: userData.login,
                    password: "",
                    name: userData.name,
                    location: userData.location,
                    socialOnly: true,
                    avatarUrl: userData.avatar_url
                });
            } catch (error) {
                console.log(error);
                return res.status(404).render("join", { pageTitle: "가입하기", errorMessage: error._message })
            }
        }
        req.session.loggedIn = true;
        req.session.user = user;
        req.flash("info", "환영합니다!");
        return res.redirect("/");
    } else {
        req.flash("error", "다시 시도해 주세요.");
        return res.redirect("/login");
    }
};

export const getEdit = (req, res) => {
    res.render("edit-profile", { pageTitle: "수정하기" });
};

export const postEdit = async (req, res) => {
    const { session: { user, user: { _id, avatarUrl } },
        body: { name, email, location },
        file } = req;
    /*
    const userId = req.session.user._id 
    const { name, email, username, location } = req.body;
    와 동일. req.session 에서 user : _id 찾고, req.body 에서 수정한 정보 찾기.
    */
    if (name !== user.name) {
        const exists = await User.exists({ name });
        if (exists) {
            return res.render("edit-profile", { pageTitle: "수정하기", errorMessage: "이미 존재하는 이름입니다." });
        }
    }
    if (email !== user.email) {
        const exists = await User.exists({ email });
        if (exists) {
            return res.render("edit-profile", { pageTitle: "수정하기", errorMessage: "중복되는 메일 주소입니다." });
        }
    }
    const isHeroku = process.env.NODE_ENV === "production";
    const updatedUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? (isHeroku ? file.location : file.path) : avatarUrl,
        // 사용자가 avatar 를 바꾸는게 아닌경우를 처리
        name,
        email,
        location
    }, { new: true });
    // new 옵션은 findByIdAndUpdate 가 updated object 를 반환할 건지 기존 것을 반환할 건지 결정

    /*
    여기까지만 하면 mongoDB 내 user 는 edit 가 되지만, session 은 로그인 할때 user 를 한 번 정의하기 때문에 바뀌지 않음.
    따라서 session 내의 데이터도 변경해줘야함.
    ...req.session.user => req.session.user 내의 데이터를 의미함. (password, avatarURL 등 나머지 데이터 처리)
    
    req.session.user = {
        ...req.session.user,
        name,
        email,
        username,
        location
    } 이런식으로 
    */

    req.session.user = updatedUser;
    req.flash("info", "변경 완료!");
    return res.redirect(`/users/${updatedUser.id}`);
};

export const getChangePassword = (req, res) => {
    if (req.session.user.socialOnly) {
        req.flash("error", "잘못된 접근입니다.");
        return res.redirect("/");
    }
    return res.render("users/change-password", { pageTitle: "비밀번호 변경" });
}
export const postChangePassword = async (req, res) => {
    const {
        session: { user: { _id }
        },
        body: { oldPassword, newPassword, newPassword2 }
    } = req;
    const user = await User.findById(_id);
    if (newPassword !== newPassword2) {
        return res.status(400).render("users/change-password", { pageTitle: "비밀번호 변경", errorMessage: "새 비밀번호가 서로 일치하지 않습니다." })
    }
    const ok = await bcrypt.compare(oldPassword, user.password);

    if (!ok) {
        return res.status(400).render("users/change-password", { pageTitle: "비밀번호 변경", errorMessage: "비밀번호가 틀립니다." })
    }

    user.password = newPassword;
    await user.save();
    req.flash("info", "변경 완료!");
    return res.redirect("/users/logout");
}

export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
            path: "owner",
            model: "User"
        }
    });
    // Double populate => videos 에 대해 populate 후 owner 얻기위해 다시 populate
    if (!user) {
        return res.status(404).render("404", { pageTitle: "존재하지 않는 사용자입니다." });
    }
    return res.render("users/profile", { pageTitle: user.name, user });
};
