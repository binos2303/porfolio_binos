// Lấy phần tử container nơi các dự án sẽ được hiển thị
const projectListContainer = document.getElementById('project-list-container');

// Hàm để tạo HTML cho một dự án
function createProjectCard(project) {
    // Tạo phần tử div cho một dự án    
    const projectItem = document.createElement('div');
    projectItem.classList.add('project-item');

    // Tạo HTML bên trong
    projectItem.innerHTML = `
        <img src="${project.image}" alt="Hình ảnh dự án ${project.id}">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank" class="project-link">Link page</a>
        <div class="tech-list">
            ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
        </div>
    `;

    return projectItem;
}

// Lấy dữ liệu từ tệp JSON
fetch('./assets/listProject.json')
    .then(response => {
        // Kiểm tra xem request có thành công không
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu dự án');
        }
        return response.json();
    })
    .then(projects => {
        // Lặp qua mảng các dự án và thêm vào trang
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectListContainer.appendChild(projectCard);
        });
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        projectListContainer.innerHTML = '<p>Không thể tải các dự án.</p>';
    });