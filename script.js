document.addEventListener('DOMContentLoaded', () => {
    // --- CÁC PHẦN TỬ CŨ ---
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    // ... (các phần tử khác giữ nguyên)
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');
    const averageTimeDisplay = document.getElementById('average-time-display');

    // CẬP NHẬT: Lấy các phần tử của khu vực quy đổi
    const hoursInput = document.getElementById('hours-input');
    const minutesInput = document.getElementById('minutes-input');
    const convertBtn = document.getElementById('convert-btn');

    // CẬP NHẬT: Thêm sự kiện click cho nút "Quy đổi"
    convertBtn.addEventListener('click', () => {
        // Lấy giá trị giờ và phút, nếu để trống thì coi như là 0
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;

        // Tính tổng số phút
        const totalMinutes = (hours * 60) + minutes;

        // Gán kết quả vào ô tổng thời gian
        totalTimeInput.value = totalMinutes;
    });

    // --- CÁC SỰ KIỆN CŨ GIỮ NGUYÊN ---
    // (minTimeRangeInput, maxTimeRangeInput event listeners...)
    
    calculateBtn.addEventListener('click', () => {
        // ... (toàn bộ logic của nút "Tính Toán" giữ nguyên không đổi)
    });

    function displayResults(times) {
        // ... (hàm displayResults giữ nguyên không đổi)
    }
});
