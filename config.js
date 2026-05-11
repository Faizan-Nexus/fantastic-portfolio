/*  ============================================================
    CONFIG.JS — Editable link configuration
    Replace placeholder URLs with your actual profile / project URLs.
    This mirrors the .env file but is used directly by the browser.
    ============================================================ */

const CONFIG = {
    /* ---- Social profiles ---- */
    GITHUB_URL: "https://github.com/Faizan-Nexus",
    LINKEDIN_URL: "https://www.linkedin.com/in/fantastic-faizan",
    KAGGLE_URL: "https://www.kaggle.com/kagg3011",

    /* ---- Images (Use CDN links or local paths) ---- */
    IMAGES: {
        profile_photo: "./assets/images/dp.jpeg",
        cert_dl: "./assets/images/DL_Certficate.png",
        cert_ml: "./assets/images/ML_Certificate.png",
        cert_dsp: "./assets/images/DSP_Certificate.png",
        cert_python: "./assets/images/Kaggle_Certificate.png",
        cert_icbeem_h: "./assets/images/icbeem_certificate.png",
        logo_icbeem: "./assets/images/icbeem_sibau.png",
        logo_icomet: "./assets/images/icomet_logo.png",
        pitch_waste: "./assets/images/Waste Management System.jpg",
    },

    /* ---- Project links (GitHub & live demo) ---- */
    projects: {
        leadIntelligence: {
            github: "https://github.com/Faizan-Nexus/Intern-Pilot",
            demo: "https://faizan-nexus.github.io/Intern-Pilot/"
        },
        vitLung: {
            github: "https://github.com/Faizan-Nexus/Applied-Machine-Learning-Projects/tree/main/Applied%20Deep%20Learning",
            demo: ""
        },
        urduSpeech: {
            github: "https://github.com/Faizan-Nexus/Urdu_Speech_Emotion",
            demo: ""
        },
        iotAnomaly: {
            github: "https://github.com/Faizan-Nexus/Iot-Sensors-Anomaly-Detection",
            demo: ""
        },
        pslCricket: {
            github: "https://github.com/Faizan-Nexus/PSL-2026-Winner-Prediction-Engine",
            demo: ""
        },
        smartGlove: {
            github: "https://github.com/Faizan-Nexus/Smart-Gesture-Glove-Translating-Hand-Gestures-into-Words",
            demo: ""
        },
        gestureRecognition: {
            github: "https://github.com/Faizan-Nexus/gesture-recognition-system",
            demo: ""
        },
        wasteManagement: {
            github: "",
            demo: ""
        }
    },

    /* ---- Resume ---- */
    RESUME_PATH: "./assets/FResume.pdf",

    /* ---- Contact ---- */
    EMAIL: "mohtramfaizan@gmail.com",
    PHONE: "+92 303 8542321",
    ADDRESS: "Punjab, Pakistan"
};
