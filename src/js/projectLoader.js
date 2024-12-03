import { placeholderProjects } from './projects.js';

export function loadProjects() {
    const path = window.location.pathname;
    let category, level;

    if (path.includes('websites')) {
        category = 'websites';
    } else if (path.includes('games')) {
        category = 'games';
    }

    if (path.includes('seniors')) {
        level = 'seniors';
    } else if (path.includes('juniors')) {
        level = 'juniors';
    }

    if (category && level) {
        const projects = placeholderProjects[category][level];
        displayProjects(projects);
    }
}

function displayProjects(projects) {
    const container = $('#project-container');
    container.empty();

    // Add winners podium
    const podium = $(`
        <div class="winners-podium mb-5" data-aos="fade-up">
            <h2 class="mb-4">Winners</h2>
            <div class="row justify-content-center">
                <div class="col-md-4 podium-place second" data-aos="fade-right" data-aos-delay="200">
                    <div class="trophy silver">🥈</div>
                    <div class="winner-card">
                        <h3>${projects[1].name}</h3>
                        <p>${projects[1].team}</p>
                    </div>
                </div>
                <div class="col-md-4 podium-place first" data-aos="fade-up" data-aos-delay="100">
                    <div class="trophy gold">🏆</div>
                    <div class="winner-card">
                        <h3>${projects[0].name}</h3>
                        <p>${projects[0].team}</p>
                    </div>
                </div>
                <div class="col-md-4 podium-place third" data-aos="fade-left" data-aos-delay="300">
                    <div class="trophy bronze">🥉</div>
                    <div class="winner-card">
                        <h3>${projects[2].name}</h3>
                        <p>${projects[2].team}</p>
                    </div>
                </div>
            </div>
        </div>
    `);

    container.append(podium);

    // Add all projects grid
    const projectsGrid = $('<div class="row g-4" data-aos="fade-up" data-aos-delay="400"></div>');
    
    projects.forEach((project, index) => {
        if (index < 3) return; // Skip winners
        const projectCard = $(`
            <div class="col-md-4">
                <div class="project-card d-flex flex-column">
                    <div class="flex-grow-1">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <small class="text-muted">By ${project.team}</small>
                    </div>
                    <div class="project-card-footer">
                        <button class="btn btn-outline-primary w-100">View Project</button>
                    </div>
                </div>
            </div>
        `);
        projectsGrid.append(projectCard);
    });

    container.append('<h2 class="mt-5 mb-4" data-aos="fade-up">All Submissions</h2>');
    container.append(projectsGrid);
}