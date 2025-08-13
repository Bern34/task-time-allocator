document.addEventListener('DOMContentLoaded', () => {
    // --- LẤY CÁC PHẦN TỬ ---
    const totalTimeInput = document.getElementById('total-time');
    const numTasksInput = document.getElementById('num-tasks');
    const minTimeRangeInput = document.getElementById('min-time-range');
    const maxTimeRangeInput = document.getElementById('max-time-range');
    const minRangeValueDisplay = document.getElementById('min-range-value-display');
    const maxRangeValueDisplay = document.getElementById('max-range-value-display');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultTableBody = document.querySelector('#result-table tbody');
    const errorMessageDiv = document.getElementById('error-message');
    const averageTimeDisplay = document.getElementById('average-time-display');
    const hoursInput = document.getElementById('hours-input');
    const minutesInput = document.getElementById('minutes-input');
    const convertBtn = document.getElementById('convert-btn');

    // --- SỰ KIỆN QUY ĐỔI ---
    convertBtn.addEventListener('click', () => {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const totalMinutes = (hours * 60) + minutes;
        
        if (totalMinutes > 0) {
            // Gán kết quả vào ô tổng thời gian
            totalTimeInput.value = totalMinutes;

            // ⭐ CẬP NHẬT ⭐: Cập nhật giới hạn của thanh trượt "tối đa"
            // Đặt mức tối đa của thanh trượt bằng tổng thời gian
            maxTimeRangeInput.max = totalMinutes;

            // Nếu giá trị hiện tại của thanh trượt lớn hơn mức tối đa mới, hãy điều chỉnh nó
            if (parseInt(maxTimeRangeInput.value) > totalMinutes) {
                maxTimeRangeInput.value = totalMinutes;
            }
            // Cập nhật lại số hiển thị
            maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
        }
    });

    // --- CÁC SỰ KIỆN THANH TRƯỢT ---
    minTimeRangeInput.addEventListener('input', () => {
        minRangeValueDisplay.textContent = minTimeRangeInput.value;
    });
    maxTimeRangeInput.addEventListener('input', () => {
        maxRangeValueDisplay.textContent = maxTimeRangeInput.value;
    });

    // --- SỰ KIỆN TÍNH TOÁN (Logic bên trong không đổi) ---
    calculateBtn.addEventListener('click', () => {
        // ... (toàn bộ logic của nút "Tính Toán" giữ nguyên như phiên bản trước)
    });
    
    function displayResults(times) {
        // ... (hàm này giữ nguyên)
    }
});
