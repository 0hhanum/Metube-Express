import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    // req.session 은 session DB 에 저장된 session. 이를 res.locals 에 저장해 pug 로 전달할 수 있게 함.
    res.locals.siteName = "Metube";
    res.locals.loggedInUser = req.session.user || {};
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "로그인 후 이용하세요.");
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "잘못된 접근입니다.");
        // flash 를 server 에서 import 하고 있기에 가능.
        return res.redirect("/");
    }
}

// multer 사용 위한 middleware configuration.
// dest: "uploads/" => 사용자가 보낸 파일을 uploads 폴더에 저장.
export const avatarUpload = multer({
    dest: "uploads/avatars/", limits: { fileSize: 30000000 }
});
export const videoUpload = multer({
    dest: "uploads/videos/", limits: { fileSize: 100000000 }
});
// *** multer 사용 시에는 form 의 enctype 지정해주는 걸 잊지 말기 ***