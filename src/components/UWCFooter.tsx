import React from "react";

type FooterLinkItem = {
    Label: string,
    path: string,
}

type FooterSocialLinkItem = {
    icon: React.ReactElement,
    link: string,
    arialLabel: string
}

interface UWCFooterProps {
    logo: React.ReactNode;
    sections?: {
        title: string;
        links: FooterLinkItem[]
    }[]; 
    socials?: FooterSocialLinkItem[];
    className?: string;
    backgroundColor?: string;
    variant: "primary" | "secondary"
}

export const UWCFooter: React.FC<UWCFooterProps> = ({
    logo,
    sections = [],
    socials = [],
    className,
    backgroundColor,
    variant = "primary"
}) => {
    const kindClasses: Record<"primary" | "secondary", string> = {
        primary: 'light-footer',
        secondary: 'dark-footer'
    }
    return (
        <footer 
            className={`uwc-footer ${className} ${kindClasses[variant]}`}
            style={{
                backgroundColor: backgroundColor
            }}
        >
            <div className="footer-content-container">
                <div className="footer-top">
                    <div className="company">
                        <div className="brand-container">
                            {logo}
                        </div>
                        <ul className="quick-contact">
                            <li className="">
                                <a href="http://" target="_blank" rel="noopener noreferrer">Bellville, Cape Town</a>
                            </li>
                            <li className=""><a href="tel:+27219592911">021 959 2911</a></li>
                        </ul>
                        {socials.length > 0 && (
                            <ul className="social-links">
                                {socials.map((social, i) => (
                                    <li key={i} className="">
                                        <a href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.arialLabel}>
                                            {social.icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {sections.length > 0 && (
                        <div className="footer-sections">
                            {sections.map((section, i) => (
                                <div key={i} className="footer-section">
                                    <h4 className="sec-title">{section.title}</h4>
                                    <ul className="list-items">
                                        {section.links.map((link, j) => (
                                            <li key={j} className="link-item">
                                                <a href={link.path} title={link.Label}>{link.Label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="footer-description">
                    <p>
                        University of the Western Cape does not discriminate on the basis of race, color, sex, gender identity or any other characteristic that is protected by applicable state or federal law in its operations, employment opportunities, educational programs, and related activities. Any person may make reports of discrimination or direct inquiries about policy to Human Resources, the Title IX Office, or the Anonymous Campus Hotline.
                    </p>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} University of the Western Cape.</p>
                    <ul className="">
                        <li>
                            <a href="https://www.uwc.ac.za/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a>
                        </li>
                        <li>
                            <a href="https://www.uwc.ac.za/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="https://www.uwc.ac.za/about/leadership/governance" target="_blank" rel="noopener noreferrer">PAIA</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}