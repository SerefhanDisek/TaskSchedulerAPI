import { Link, useNavigate } from "react-router-dom"; // useNavigate import edildi
import Button from "devextreme-react/button";
import "../styles/AnaSayfa.css";

function AnaSayfa() {
    const navigate = useNavigate(); // useNavigate kullanýlarak navigate fonksiyonu alýndý

    const navigateTo = (path) => {
        navigate(path); // navigate fonksiyonu ile belirtilen yola yönlendirme yapýlýyor
    };

    return (
        <div className="container">
            <h1 className="title">Hos Geldiniz!</h1>
            <div className="button-group">
                <Link to="/login">
                    <Button text="Giris Yap" className="btn" />
                </Link>
                <Link to="/register">
                    <Button text="Kayit Ol" className="btn" />
                </Link>
                <Button text="Gorevler" onClick={() => navigateTo('/tasks')} className="btn" />
                <Button text="Kullanicilar" onClick={() => navigateTo('/users')} className="btn" />
                <Button text="Gorev Dagitimi" onClick={() => navigateTo('/tasks-distribution')} className="btn" />
            </div>
        </div>
    );
}

export default AnaSayfa;
