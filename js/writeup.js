// Lấy phần tử container nơi các bài viết sẽ được hiển thị
const writeupListContainer = document.getElementById('writeup-list-container');

// Hàm để tạo HTML cho một bài viết
function createWriteupCard(writeup) {
    const writeupItem = document.createElement('div');
    writeupItem.classList.add('writeup-item');

    writeupItem.innerHTML = `
        <h2><a href="${writeup.link}">${writeup.title}</a></h2>
        <p class="writeup-date">${writeup.date}</p>
        <p>${writeup.description}</p>
        <div class="tags-list">
            ${writeup.tags.map(tag => `<span class="tag-item">${tag}</span>`).join('')}
        </div>
    `;

    return writeupItem;
}

// Lấy dữ liệu từ tệp JSON
fetch('./assets/listWriteup_CTF.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Lỗi khi tải dữ liệu bài viết');
        }
        return response.json();
    })
    .then(writeups => {
        writeups.forEach(writeup => {
            const writeupCard = createWriteupCard(writeup);
            writeupListContainer.appendChild(writeupCard);
        });
    })
    .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
        writeupListContainer.innerHTML = '<p>Không thể tải các bài viết.</p>';
    });