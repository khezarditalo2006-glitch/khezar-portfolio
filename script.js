/* =========================================================
   KHEZAR DITALO — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* =========================================================
   ACTIVE NAVIGATION
   Highlights the section currently visible on screen
   ========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const updateActiveNav = () => {

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

};


window.addEventListener(
    "scroll",
    updateActiveNav
);

window.addEventListener(
    "load",
    updateActiveNav
);


/* =========================================================
   SCROLL REVEAL
   Reveals elements when they enter the viewport
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-on-scroll"
);


/*
   Reveal elements when they enter the viewport.
   The observer is intentionally shared by both
   reveal classes so every section behaves consistently.
*/

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
       Fallback for browsers without
       IntersectionObserver support.
    */

    revealElements.forEach((element) => {

        element.classList.add(
            "is-visible"
        );

    });

}


/* =========================================================
   PROJECT SHOWCASE MODAL
   ========================================================= */


/* ---------------------------------------------------------
   PROJECT DATA
   --------------------------------------------------------- */

const projects = {

    /* =====================================================
       LIBRARY MANAGEMENT SYSTEM
       ===================================================== */

    library: {

        number: "PROJECT / 01",

        type: "ACADEMIC PROJECT",

        title:
            "Library Management System",

        description:
            "A desktop-based library management system designed to organize books and student records while making borrowing and returning books easier to manage.",

        role:
            "Developer / Designer",

        category:
            "Management System",

        technologies: [
            "VISUAL BASIC",
            "DATABASE",
            "UI DESIGN",
            "SDLC"
        ],

        images: [
            "images/library-system/signup.png",
            "images/library-system/login.png",
            "images/library-system/dashboard.png",
            "images/library-system/addstudents.png",
            "images/library-system/addbooks.png",
            "images/library-system/issuebooks.png",
            "images/library-system/returnbooks.png",
            "images/library-system/completebookdetails.png"
        ]

    },


    /* =====================================================
       STUDYFLOW
       ===================================================== */

    studyflow: {

        number: "PROJECT / 02",

        type: "UI / UX",

        title:
            "StudyFlow",

        description:
            "A student-focused study management dashboard designed to help organize tasks, study sessions, and academic activities.",

        role:
            "UI/UX Designer",

        category:
            "Student Dashboard",

        technologies: [
            "HTML",
            "CSS",
            "UI / UX",
            "PROTOTYPING"
        ],

        images: [
            "images/studyflow/dashboard.png",
            "images/studyflow/task.png",
            "images/studyflow/planner.png",
            "images/studyflow/focus.png",
            "images/studyflow/progress.png",
            "images/studyflow/profile.png",
            "images/studyflow/settings.png"
        ]

    },


    /* =====================================================
       ONANG'S FOODHUB
       ===================================================== */

    foodhub: {

        number: "PROJECT / 03",

        type: "WEB DEVELOPMENT",

        title:
            "Onang's Foodhub",

        description:
            "A food-focused web interface created to present products in a simple, accessible, and visually engaging way.",

        role:
            "Web Developer / Designer",

        category:
            "Web Interface",

        technologies: [
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "UI DESIGN"
        ],

        images: [
            "images/foodhub/home.png",
            "images/foodhub/bestseller.png",
            "images/foodhub/noodles&soups.png",
            "images/foodhub/pulutan&snacks.png",
            "images/foodhub/faq.png",
            "images/foodhub/aboutus.png"
        ]

    }

};


/* ---------------------------------------------------------
   MODAL ELEMENTS
   --------------------------------------------------------- */

const projectModal =
    document.getElementById("projectModal");


const projectModalClose =
    document.getElementById("projectModalClose");


const modalProjectNumber =
    document.getElementById("modalProjectNumber");


const modalProjectType =
    document.getElementById("modalProjectType");


const modalProjectTitle =
    document.getElementById("modalProjectTitle");


const modalProjectDescription =
    document.getElementById("modalProjectDescription");


const modalProjectRole =
    document.getElementById("modalProjectRole");


const modalProjectCategory =
    document.getElementById("modalProjectCategory");


const modalTech1 =
    document.getElementById("modalTech1");


const modalTech2 =
    document.getElementById("modalTech2");


const modalTech3 =
    document.getElementById("modalTech3");


const modalTech4 =
    document.getElementById("modalTech4");


/* ---------------------------------------------------------
   PROJECT GALLERY ELEMENTS
   --------------------------------------------------------- */

const modalProjectImage =
    document.getElementById("modalProjectImage");


const galleryPrev =
    document.getElementById("galleryPrev");


const galleryNext =
    document.getElementById("galleryNext");


const galleryCounter =
    document.getElementById("galleryCounter");


const galleryThumbnails =
    document.getElementById("galleryThumbnails");


/* ---------------------------------------------------------
   GALLERY STATE
   --------------------------------------------------------- */

let currentProjectImages = [];

let currentProjectIndex = 0;


/* ---------------------------------------------------------
   UPDATE PROJECT GALLERY
   --------------------------------------------------------- */

const updateProjectGallery = () => {

    if (
        !modalProjectImage ||
        currentProjectImages.length === 0
    ) {

        return;

    }


    const currentImage =
        currentProjectImages[currentProjectIndex];


    /* Main image */

    modalProjectImage.src =
        currentImage;


    modalProjectImage.alt =
        `Project screenshot ${currentProjectIndex + 1}`;


    /* Counter */

    if (galleryCounter) {

        galleryCounter.textContent =
            `${String(currentProjectIndex + 1).padStart(2, "0")} / ${String(currentProjectImages.length).padStart(2, "0")}`;

    }


    /* Active thumbnail */

    if (galleryThumbnails) {

        const thumbnails =
            galleryThumbnails.querySelectorAll(
                ".gallery-thumbnail"
            );


        thumbnails.forEach(
            (thumbnail, index) => {

                thumbnail.classList.toggle(
                    "active",
                    index === currentProjectIndex
                );

            }
        );

    }

};


/* ---------------------------------------------------------
   CREATE PROJECT THUMBNAILS
   --------------------------------------------------------- */

const createProjectThumbnails = () => {

    if (!galleryThumbnails) {

        return;

    }


    galleryThumbnails.innerHTML = "";


    currentProjectImages.forEach(
        (image, index) => {

            const thumbnail =
                document.createElement("button");


            thumbnail.className =
                "gallery-thumbnail";


            thumbnail.type =
                "button";


            thumbnail.setAttribute(
                "aria-label",
                `View project image ${index + 1}`
            );


            const thumbnailImage =
                document.createElement("img");


            thumbnailImage.src =
                image;


            thumbnailImage.alt =
                `Project thumbnail ${index + 1}`;


            thumbnail.appendChild(
                thumbnailImage
            );


            thumbnail.addEventListener(
                "click",
                () => {

                    currentProjectIndex =
                        index;

                    updateProjectGallery();

                }
            );


            galleryThumbnails.appendChild(
                thumbnail
            );

        }
    );


    updateProjectGallery();

};


/* ---------------------------------------------------------
   PREVIOUS IMAGE
   --------------------------------------------------------- */

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (
                currentProjectImages.length === 0
            ) {

                return;

            }


            currentProjectIndex--;


            if (
                currentProjectIndex < 0
            ) {

                currentProjectIndex =
                    currentProjectImages.length - 1;

            }


            updateProjectGallery();

        }
    );

}


/* ---------------------------------------------------------
   NEXT IMAGE
   --------------------------------------------------------- */

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            if (
                currentProjectImages.length === 0
            ) {

                return;

            }


            currentProjectIndex++;


            if (
                currentProjectIndex >=
                currentProjectImages.length
            ) {

                currentProjectIndex = 0;

            }


            updateProjectGallery();

        }
    );

}


/* ---------------------------------------------------------
   OPEN PROJECT MODAL
   --------------------------------------------------------- */

const openProjectModal = (projectKey) => {

    const project =
        projects[projectKey];


    if (!project || !projectModal) {

        return;

    }


    /* Project information */

    modalProjectNumber.textContent =
        project.number;


    modalProjectType.textContent =
        project.type;


    modalProjectTitle.textContent =
        project.title;


    modalProjectDescription.textContent =
        project.description;


    modalProjectRole.textContent =
        project.role;


    modalProjectCategory.textContent =
        project.category;


    /* Project images */

    currentProjectImages =
        Array.isArray(project.images)
            ? project.images
            : [];


    currentProjectIndex = 0;


    createProjectThumbnails();


    /* Technologies */

    const technologyElements = [

        modalTech1,
        modalTech2,
        modalTech3,
        modalTech4

    ];


    technologyElements.forEach(
        (element, index) => {

            if (!element) {

                return;

            }


            if (
                project.technologies &&
                project.technologies[index]
            ) {

                element.textContent =
                    project.technologies[index];

                element.style.display =
                    "inline-block";

            } else {

                element.style.display =
                    "none";

            }

        }
    );


    /* Show modal */

    projectModal.classList.add(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

};


/* ---------------------------------------------------------
   CLOSE PROJECT MODAL
   --------------------------------------------------------- */

const closeProjectModal = () => {

    if (!projectModal) {

        return;

    }


    projectModal.classList.remove(
        "active"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

};


/* ---------------------------------------------------------
   PROJECT BUTTONS
   --------------------------------------------------------- */


/* LIBRARY MANAGEMENT SYSTEM */

const libraryButton =
    document.querySelector(
        "#projects .project-featured .project-link"
    );


if (libraryButton) {

    libraryButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openProjectModal(
                "library"
            );

        }
    );

}


/* STUDYFLOW */

const studyflowButton =
    document.querySelectorAll(
        "#projects .project-card .project-link"
    )[0];


if (studyflowButton) {

    studyflowButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openProjectModal(
                "studyflow"
            );

        }
    );

}


/* ONANG'S FOODHUB */

const foodhubButton =
    document.querySelectorAll(
        "#projects .project-card .project-link"
    )[1];


if (foodhubButton) {

    foodhubButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openProjectModal(
                "foodhub"
            );

        }
    );

}


/* ---------------------------------------------------------
   CLOSE BUTTON
   --------------------------------------------------------- */

if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


/* ---------------------------------------------------------
   CLICK OUTSIDE MODAL
   --------------------------------------------------------- */

const modalOverlay =
    document.querySelector(
        "[data-close-modal]"
    );


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}


/* ---------------------------------------------------------
   ESCAPE KEY
   --------------------------------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProjectModal();

        }

    }
);