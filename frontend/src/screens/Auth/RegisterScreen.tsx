import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bglogin from "@/assets/backlogin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../actions/userActions";
import LogoWeb from "@/assets/logo.png";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$]).{8,24}$/;

export default function RegisterScreen() {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLInputElement | null>(null);
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
        console.log("User:", user, "Valid Name:", result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await registerUser(user, `${user}@example.com`, pwd);
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };

    return (
        <div className="bg-black text-white font-Nurito flex items-center justify-center h-screen">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/auth/login">Sign In</Link>
                    </p>
                </section>
            ) : (
                <>
                    {/* Left Column (Image) */}
                    <div className="w-11/20 h-full flex items-center justify-center">
                        <img src={bglogin} alt="loginbackground" className="max-w-full h-auto" />
                    </div>

                    {/* Right Column (Form) */}
                    <div className="w-9/20 p-8 rounded-lg shadow-lg mr-20">
                        <div className="w-11/20 h-full flex items-center justify-center ml-30">
                            <Link to="/"><img src={LogoWeb} alt="loginbackground" className="max-w-full h-auto" /></Link>
                        </div>
                        <div className="bg-gray-800 w-5/5 mr-10 border-t-orange-500 border-t-5">
                            <div className="h-4"></div>
                            <form className="bg-gray-800 ml-10 mr-10" onSubmit={handleSubmit}>
                                <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Đăng ký tài khoản mới</h1>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div className="mb-4 w-full">
                                    <label htmlFor="username" className="block font-medium w-full">User Name</label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        className="p-2 border rounded w-full"
                                        placeholder="Nhập user name"
                                    />
                                    <p id="uidnote" className={userFocus && !validName ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                         4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="password" className="block font-medium w-full">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                        className="p-2 border rounded w-full"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                         8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: ! @ # $ %
                                    </p>
                                </div>
                                <div className="mb-4 w-full">
                                    <label htmlFor="confirm_pwd" className="block font-medium w-full">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                        className="p-2 border rounded w-full"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                         Must match the first password input field.
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="remember" className="w-5 h-5 bg-gray-600" />
                                        <label htmlFor="remember" className="ml-2">Remember Account</label>
                                    </div>
                                </div>
                                <div className="h-4"></div>
                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 text-white p-2 rounded hover:bg-yellow-400"
                                    disabled={!validName || !validPwd || !validMatch}
                                >
                                    Đăng ký
                                </button>
                                <div className="h-4"></div>
                                <div className="flex items-center justify-center gap-2">
                                    <h2>Old user?</h2>
                                    <Link to="/auth/login" className="text-orange-500 hover:text-yellow-400">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}