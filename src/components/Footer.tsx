import React from "react";
import { Facebook, Linkedin, Twitter, Youtube } from "react-bootstrap-icons";

const footerIcons = [Facebook, Twitter, Linkedin, Youtube]
const Footer: React.FC = () => {

    return (
        <>
            <div className="d-flex justify-content-center mt-3 pt-2 mt-md-4 pt-md-4 mb-4">
                {footerIcons.map((Icon, i) => (
                    <div key={i} className="d-flex align-items-center justify-content-center mx-2 icon-circle">
                        <Icon size={20} className="text-muted" />
                    </div>
                ))}
            </div>
            <p className="small fw-semibold">Example@email.com</p>
            <p className="small fw-semibold">Copyright &copy; 2020 Name. All rights reserved.</p>
        </>
    );
};

export default Footer;