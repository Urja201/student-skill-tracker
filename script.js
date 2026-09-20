/* =========================================
   STUDENT SKILL TRACKER
========================================= */


/* =========================================
   CATEGORIES
========================================= */

const categories = [

    "Programming",

    "Web Development",

    "Database",

    "AI / Machine Learning",

    "Data Science",

    "Cybersecurity",

    "Cloud Computing",

    "App Development",

    "UI/UX",

    "Tools & Version Control",

    "Communication",

    "Other"

];


/* =========================================
   DEFAULT SKILLS
========================================= */

const defaultSkills = [

    {
        id: 1,
        name: "C Programming",
        category: "Programming",
        progress: 80
    },

    {
        id: 2,
        name: "C++",
        category: "Programming",
        progress: 70
    },

    {
        id: 3,
        name: "Python",
        category: "Programming",
        progress: 50
    },

    {
        id: 4,
        name: "HTML & CSS",
        category: "Web Development",
        progress: 80
    },

    {
        id: 5,
        name: "Git & GitHub",
        category: "Tools & Version Control",
        progress: 30
    }

];


/* =========================================
   DEFAULT PROFILE
========================================= */

const defaultProfile = {

    name: "",

    college: "",

    branch: "Computer Engineering",

    year: "2nd Year",

    semester: "4th Semester",

    email: "",

    github: "",

    linkedin: "",

    goal: "",

    bio: ""

};


/* =========================================
   LOAD DATA
========================================= */

let skills =
    JSON.parse(
        localStorage.getItem("studentSkills")
    );


let profile =
    JSON.parse(
        localStorage.getItem("studentProfile")
    );


if (!skills) {

    skills = defaultSkills;

    saveSkills();

}


if (!profile) {

    profile = defaultProfile;

    saveProfileData();

}


/* =========================================
   EDITING ID
========================================= */

let editingSkillId = null;


/* =========================================
   SAVE SKILLS
========================================= */

function saveSkills() {

    localStorage.setItem(
        "studentSkills",
        JSON.stringify(skills)
    );

}


/* =========================================
   SAVE PROFILE DATA
========================================= */

function saveProfileData() {

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(profile)
    );

}


/* =========================================
   DISPLAY PROFILE
========================================= */

function displayProfile() {

    const name =
        profile.name ||
        "Your Name";


    document.getElementById(
        "profileName"
    ).textContent = name;


    document.getElementById(
        "profileEducation"
    ).textContent =
        `${profile.branch || "Computer Engineering"} • ${profile.year || "2nd Year"}`;


    document.getElementById(
        "profileCollege"
    ).textContent =
        profile.college || "Not added";


    document.getElementById(
        "profileSemester"
    ).textContent =
        profile.semester || "Not added";


    document.getElementById(
        "profileEmail"
    ).textContent =
        profile.email || "Not added";


    document.getElementById(
        "profileGoal"
    ).textContent =
        profile.goal || "Not added";


    document.getElementById(
        "profileBio"
    ).textContent =
        profile.bio ||
        "Add a short bio about yourself.";


    /* Avatar */

    document.getElementById(
        "profileAvatar"
    ).textContent =
        name === "Your Name"
        ? "U"
        : name.charAt(0).toUpperCase();


    /* GitHub */

    const githubLink =
        document.getElementById(
            "githubLink"
        );


    if (profile.github) {

        githubLink.href =
            profile.github;

        githubLink.style.display =
            "inline-block";

    } else {

        githubLink.style.display =
            "none";

    }


    /* LinkedIn */

    const linkedinLink =
        document.getElementById(
            "linkedinLink"
        );


    if (profile.linkedin) {

        linkedinLink.href =
            profile.linkedin;

        linkedinLink.style.display =
            "inline-block";

    } else {

        linkedinLink.style.display =
            "none";

    }

}


/* =========================================
   OPEN PROFILE MODAL
========================================= */

function openProfileModal() {

    document.getElementById(
        "profileNameInput"
    ).value =
        profile.name;


    document.getElementById(
        "profileCollegeInput"
    ).value =
        profile.college;


    document.getElementById(
        "profileBranchInput"
    ).value =
        profile.branch;


    document.getElementById(
        "profileYearInput"
    ).value =
        profile.year;


    document.getElementById(
        "profileSemesterInput"
    ).value =
        profile.semester;


    document.getElementById(
        "profileEmailInput"
    ).value =
        profile.email;


    document.getElementById(
        "githubInput"
    ).value =
        profile.github;


    document.getElementById(
        "linkedinInput"
    ).value =
        profile.linkedin;


    document.getElementById(
        "profileGoalInput"
    ).value =
        profile.goal;


    document.getElementById(
        "profileBioInput"
    ).value =
        profile.bio;


    document.getElementById(
        "profileModal"
    ).classList.add("show");

}


/* =========================================
   CLOSE PROFILE MODAL
========================================= */

function closeProfileModal() {

    document.getElementById(
        "profileModal"
    ).classList.remove("show");

}


/* =========================================
   SAVE PROFILE
========================================= */

function saveProfile() {

    profile.name =
        document.getElementById(
            "profileNameInput"
        ).value.trim();


    profile.college =
        document.getElementById(
            "profileCollegeInput"
        ).value.trim();


    profile.branch =
        document.getElementById(
            "profileBranchInput"
        ).value.trim();


    profile.year =
        document.getElementById(
            "profileYearInput"
        ).value;


    profile.semester =
        document.getElementById(
            "profileSemesterInput"
        ).value;


    profile.email =
        document.getElementById(
            "profileEmailInput"
        ).value.trim();


    profile.github =
        document.getElementById(
            "githubInput"
        ).value.trim();


    profile.linkedin =
        document.getElementById(
            "linkedinInput"
        ).value.trim();


    profile.goal =
        document.getElementById(
            "profileGoalInput"
        ).value.trim();


    profile.bio =
        document.getElementById(
            "profileBioInput"
        ).value.trim();


    saveProfileData();


    displayProfile();


    closeProfileModal();

}


/* =========================================
   DISPLAY SKILLS
========================================= */

function displaySkills() {

    const skillsList =
        document.getElementById(
            "skillsList"
        );


    const searchText =
        document.getElementById(
            "searchInput"
        )
        .value
        .trim()
        .toLowerCase();


    const selectedCategory =
        document.getElementById(
            "categoryFilter"
        ).value;


    const selectedLevel =
        document.getElementById(
            "levelFilter"
        ).value;


    skillsList.innerHTML = "";


    const filteredSkills =
        skills.filter(
            function(skill) {

                const matchesSearch =
                    skill.name
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesCategory =
                    selectedCategory === "All" ||
                    skill.category === selectedCategory;


                const matchesLevel =
                    selectedLevel === "All" ||
                    getSkillLevel(
                        skill.progress
                    ) === selectedLevel;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesLevel
                );

            }
        );


    /* =====================================
       NO RESULTS
    ===================================== */

    if (
        filteredSkills.length === 0
    ) {

        skillsList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🔎
                </div>

                <h3>
                    No skills found
                </h3>

                <p>
                    Try another search,
                    category or level.
                </p>

            </div>

        `;

    }


    /* =====================================
       CREATE CARDS
    ===================================== */

    filteredSkills.forEach(
        function(skill) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "skill-card";


            const level =
                getSkillLevel(
                    skill.progress
                );


            card.innerHTML = `

                <div class="skill-header">

                    <span class="skill-name">
                        ${escapeHTML(skill.name)}
                    </span>

                    <span class="skill-percentage">
                        ${skill.progress}%
                    </span>

                </div>


                <div class="skill-meta">

                    <span class="category">
                        ${escapeHTML(skill.category)}
                    </span>

                    <span class="level">
                        ${level}
                    </span>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress"
                        style="width: ${skill.progress}%"
                    ></div>

                </div>


                <div class="skill-actions">

                    <button
                        onclick="openEditModal(${skill.id})"
                    >
                        ✏ Edit
                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteSkill(${skill.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            `;


            skillsList.appendChild(
                card
            );

        }
    );


    updateDashboard();

}


/* =========================================
   ADD SKILL
========================================= */

function addSkill() {

    const nameInput =
        document.getElementById(
            "skillName"
        );


    const categoryInput =
        document.getElementById(
            "skillCategory"
        );


    const progressInput =
        document.getElementById(
            "skillProgress"
        );


    const name =
        nameInput.value.trim();


    const category =
        categoryInput.value;


    const progress =
        Number(
            progressInput.value
        );


    if (name === "") {

        alert(
            "Please enter a skill name."
        );

        return;

    }


    if (
        progressInput.value === "" ||
        progress < 0 ||
        progress > 100
    ) {

        alert(
            "Progress must be between 0 and 100."
        );

        return;

    }


    /* Duplicate check */

    const duplicate =
        skills.some(
            function(skill) {

                return (
                    skill.name
                        .trim()
                        .toLowerCase() ===
                    name
                        .trim()
                        .toLowerCase()
                );

            }
        );


    if (duplicate) {

        alert(
            "This skill already exists!"
        );

        return;

    }


    /* Add */

    skills.push({

        id: Date.now(),

        name: name,

        category: category,

        progress: progress

    });


    saveSkills();


    nameInput.value = "";

    progressInput.value = "";


    displaySkills();

}


/* =========================================
   DELETE SKILL
========================================= */

function deleteSkill(id) {

    const skill =
        skills.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!skill) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${skill.name}"?`
        );


    if (!confirmed) {

        return;

    }


    skills =
        skills.filter(
            function(item) {

                return item.id !== id;

            }
        );


    saveSkills();

    displaySkills();

}


/* =========================================
   OPEN EDIT SKILL
========================================= */

function openEditModal(id) {

    const skill =
        skills.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!skill) {

        return;

    }


    editingSkillId = id;


    document.getElementById(
        "editSkillName"
    ).value =
        skill.name;


    document.getElementById(
        "editSkillCategory"
    ).value =
        skill.category;


    document.getElementById(
        "editSkillProgress"
    ).value =
        skill.progress;


    document.getElementById(
        "editModal"
    ).classList.add(
        "show"
    );

}


/* =========================================
   CLOSE EDIT SKILL
========================================= */

function closeEditModal() {

    editingSkillId = null;


    document.getElementById(
        "editModal"
    ).classList.remove(
        "show"
    );

}


/* =========================================
   SAVE EDITED SKILL
========================================= */

function saveEditedSkill() {

    if (
        editingSkillId === null
    ) {

        return;

    }


    const name =
        document.getElementById(
            "editSkillName"
        ).value.trim();


    const category =
        document.getElementById(
            "editSkillCategory"
        ).value;


    const progressInput =
        document.getElementById(
            "editSkillProgress"
        );


    const progress =
        Number(
            progressInput.value
        );


    if (name === "") {

        alert(
            "Skill name cannot be empty."
        );

        return;

    }


    if (
        progressInput.value === "" ||
        progress < 0 ||
        progress > 100
    ) {

        alert(
            "Progress must be between 0 and 100."
        );

        return;

    }


    /* Duplicate check */

    const duplicate =
        skills.some(
            function(skill) {

                return (
                    skill.id !==
                    editingSkillId &&

                    skill.name
                        .trim()
                        .toLowerCase() ===
                    name
                        .trim()
                        .toLowerCase()
                );

            }
        );


    if (duplicate) {

        alert(
            "Another skill with this name already exists!"
        );

        return;

    }


    const skill =
        skills.find(
            function(item) {

                return (
                    item.id ===
                    editingSkillId
                );

            }
        );


    skill.name =
        name;

    skill.category =
        category;

    skill.progress =
        progress;


    saveSkills();


    closeEditModal();


    displaySkills();

}


/* =========================================
   SKILL LEVEL
========================================= */

function getSkillLevel(progress) {

    if (progress <= 20) {

        return "Beginner";

    }


    if (progress <= 40) {

        return "Elementary";

    }


    if (progress <= 60) {

        return "Intermediate";

    }


    if (progress <= 75) {

        return "Upper Intermediate";

    }


    if (progress <= 90) {

        return "Advanced";

    }


    return "Expert";

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    const total =
        skills.length;


    let average = 0;


    if (total > 0) {

        const totalProgress =
            skills.reduce(
                function(sum, skill) {

                    return (
                        sum +
                        skill.progress
                    );

                },
                0
            );


        average =
            Math.round(
                totalProgress /
                total
            );

    }


    document.getElementById(
        "totalSkills"
    ).textContent =
        total;


    document.getElementById(
        "overallProgress"
    ).textContent =
        average + "%";


    document.getElementById(
        "overallText"
    ).textContent =
        average + "%";


    document.getElementById(
        "overallProgressBar"
    ).style.width =
        average + "%";


    document.getElementById(
        "skillCountText"
    ).textContent =
        total +
        (
            total === 1
            ? " skill"
            : " skills"
        );


    updateAchievements();

}


/* =========================================
   ACHIEVEMENTS
========================================= */

function updateAchievements() {

    const achievements = [

        {
            icon: "🌱",
            title: "First Step",
            description:
                "Track your first skill.",
            unlocked:
                skills.length >= 1
        },


        {
            icon: "📚",
            title: "Skill Collector",
            description:
                "Track 5 skills.",
            unlocked:
                skills.length >= 5
        },


        {
            icon: "🚀",
            title: "Getting Serious",
            description:
                "Track 8 skills.",
            unlocked:
                skills.length >= 8
        },


        {
            icon: "⭐",
            title: "Advanced",
            description:
                "Reach Advanced level.",
            unlocked:
                skills.some(
                    skill =>
                        getSkillLevel(
                            skill.progress
                        ) === "Advanced" ||
                        getSkillLevel(
                            skill.progress
                        ) === "Expert"
                )
        },


        {
            icon: "🔥",
            title: "High Progress",
            description:
                "Reach 90% in any skill.",
            unlocked:
                skills.some(
                    skill =>
                        skill.progress >= 90
                )
        },


        {
            icon: "🏆",
            title: "Skill Master",
            description:
                "Reach 100% in any skill.",
            unlocked:
                skills.some(
                    skill =>
                        skill.progress === 100
                )
        }

    ];


    const list =
        document.getElementById(
            "achievementsList"
        );


    list.innerHTML = "";


    let unlockedCount = 0;


    achievements.forEach(
        function(achievement) {

            if (
                achievement.unlocked
            ) {

                unlockedCount++;

            }


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "achievement " +
                (
                    achievement.unlocked
                    ? ""
                    : "locked"
                );


            element.innerHTML = `

                <div class="achievement-icon">
                    ${achievement.icon}
                </div>

                <div>

                    <h3>
                        ${achievement.title}
                    </h3>

                    <p>
                        ${achievement.description}
                    </p>

                </div>

            `;


            list.appendChild(
                element
            );

        }
    );


    document.getElementById(
        "achievementCount"
    ).textContent =
        unlockedCount;

}


/* =========================================
   DARK MODE
========================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "darkMode",
        dark
    );


    updateThemeButton();

}


/* =========================================
   THEME BUTTON
========================================= */

function updateThemeButton() {

    const button =
        document.getElementById(
            "themeButton"
        );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    button.textContent =
        dark
        ? "☀️"
        : "🌙";

}


/* =========================================
   LOAD DARK MODE
========================================= */

function loadDarkMode() {

    const saved =
        localStorage.getItem(
            "darkMode"
        );


    if (
        saved === "true"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeButton();

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================
   CLOSE MODALS OUTSIDE
========================================= */

document.getElementById(
    "profileModal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target === this
        ) {

            closeProfileModal();

        }

    }
);


document.getElementById(
    "editModal"
).addEventListener(
    "click",
    function(event) {

        if (
            event.target === this
        ) {

            closeEditModal();

        }

    }
);


/* =========================================
   START APPLICATION
========================================= */

loadDarkMode();

displayProfile();

displaySkills();

// ================= PROJECT MANAGEMENT =================

let projects = JSON.parse(localStorage.getItem("studentProjects")) || [];

let editingProjectId = null;


// ADD PROJECT

function addProject() {

    const name = document.getElementById("projectName").value.trim();
    const tech = document.getElementById("projectTech").value.trim();
    const status = document.getElementById("projectStatus").value;
    const github = document.getElementById("projectGithub").value.trim();
    const description = document.getElementById("projectDescription").value.trim();


    // Check project name

    if (name === "") {
        alert("Please enter a project name.");
        return;
    }


    // Prevent duplicate projects

    const duplicate = projects.some(
        project =>
            project.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
        alert("This project already exists.");
        return;
    }


    // Create project

    const project = {
        id: Date.now(),
        name: name,
        tech: tech || "Not specified",
        status: status,
        github: github,
        description: description || "No description added."
    };


    projects.push(project);

    saveProjects();

    displayProjects();

    clearProjectForm();
}


// SAVE PROJECTS

function saveProjects() {

    localStorage.setItem(
        "studentProjects",
        JSON.stringify(projects)
    );

}


// DISPLAY PROJECTS

function displayProjects() {

    const container =
        document.getElementById("projectsList");

    const count =
        document.getElementById("projectCount");


    if (!container) return;


    container.innerHTML = "";


    count.textContent =
        `${projects.length} ${projects.length === 1 ? "Project" : "Projects"}`;


    if (projects.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <p>📁 No projects added yet.</p>
                <span>Add your first project above.</span>
            </div>
        `;

        return;
    }


    projects.forEach(project => {

        const card =
            document.createElement("div");

        card.className = "project-card";


        card.innerHTML = `

            <div class="project-card-top">

                <div>
                    <h3>
                        ${escapeHTML(project.name)}
                    </h3>

                    <span class="project-status ${getStatusClass(project.status)}">
                        ${escapeHTML(project.status)}
                    </span>
                </div>

            </div>


            <p class="project-description">
                ${escapeHTML(project.description)}
            </p>


            <div class="project-tech">

                <strong>🛠 Technology:</strong>

                <span>
                    ${escapeHTML(project.tech)}
                </span>

            </div>


            <div class="project-actions">

                ${
                    project.github
                    ?
                    `<a
                        href="${escapeHTML(project.github)}"
                        target="_blank"
                        class="project-link"
                    >
                        GitHub ↗
                    </a>`
                    :
                    ""
                }


                <button
                    class="edit-project-btn"
                    onclick="openProjectEditModal(${project.id})"
                >
                    ✏ Edit
                </button>


                <button
                    class="delete-project-btn"
                    onclick="deleteProject(${project.id})"
                >
                    🗑 Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// PROJECT STATUS CLASS

function getStatusClass(status) {

    if (status === "Completed") {
        return "status-completed";
    }

    if (status === "In Progress") {
        return "status-progress";
    }

    return "status-planning";

}


// CLEAR FORM

function clearProjectForm() {

    document.getElementById("projectName").value = "";

    document.getElementById("projectTech").value = "";

    document.getElementById("projectStatus").value =
        "Planning";

    document.getElementById("projectGithub").value = "";

    document.getElementById("projectDescription").value = "";

}


// DELETE PROJECT

function deleteProject(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this project?");

    if (!confirmDelete) return;


    projects =
        projects.filter(project => project.id !== id);


    saveProjects();

    displayProjects();

}


// ================= EDIT PROJECT =================

function openProjectEditModal(id) {

    const project = projects.find(
        project => project.id === id
    );

    if (!project) return;


    const newName = prompt(
        "Project Name:",
        project.name
    );

    if (newName === null) return;


    const newTech = prompt(
        "Technology Used:",
        project.tech
    );

    if (newTech === null) return;


    const newStatus = prompt(
        "Status: Planning / In Progress / Completed",
        project.status
    );

    if (newStatus === null) return;


    const validStatuses = [
        "Planning",
        "In Progress",
        "Completed"
    ];

    if (!validStatuses.includes(newStatus)) {

        alert(
            "Please enter exactly: Planning, In Progress, or Completed."
        );

        return;
    }


    const newGithub = prompt(
        "GitHub Link:",
        project.github
    );

    if (newGithub === null) return;


    const newDescription = prompt(
        "Project Description:",
        project.description
    );

    if (newDescription === null) return;


    // Update project

    project.name =
        newName.trim();

    project.tech =
        newTech.trim();

    project.status =
        newStatus;

    project.github =
        newGithub.trim();

    project.description =
        newDescription.trim();


    saveProjects();

    displayProjects();

}


// CLOSE EDIT PROJECT

function closeProjectEditModal() {

    document.getElementById("projectEditModal")
        .classList.remove("active");

    editingProjectId = null;

}




// LOAD PROJECTS

displayProjects();
