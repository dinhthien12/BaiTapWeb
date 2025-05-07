document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("password").addEventListener("input", function() {
        let password = this.value;
        let messageDiv = document.getElementById("passwordMessage");
        let strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!strongPasswordPattern.test(password)) {
            messageDiv.innerHTML = "Mật khẩu yếu, ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ số và 8 ký tự trở lên";
        } else {
            messageDiv.innerHTML = "Hợp lệ";
        }
    });

    document.getElementById("phone").addEventListener("input", function() {
        let phone = this.value;
        let messageDiv = document.getElementById("phoneMessage");
        let phonePattern = /^\d{10}$/;

        if (!phonePattern.test(phone)) {
            messageDiv.innerHTML = "Số điện thoại phải có 10 chữ số!";
        } else {
            messageDiv.innerHTML = "";
        }
    });

    document.getElementById("email").addEventListener("input", function() {
        let email = this.value;
        let messageDiv = document.getElementById("emailMessage");
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            messageDiv.innerHTML = "Email không đúng định dạng!";
        } else {
            messageDiv.innerHTML = "";
        }
    });

    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let messageDiv = document.getElementById("message");
        messageDiv.innerHTML = "";

        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let policyCheck = document.getElementById("policyCheck").checked;

        let phonePattern = /^\d{10}$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!strongPasswordPattern.test(password)) {
            messageDiv.innerHTML = "Mật khẩu không đủ mạnh!";
            return;
        }
        if (password !== confirmPassword) {
            messageDiv.innerHTML = "Mật khẩu nhập lại không khớp!";
            return;
        }
        if (!phonePattern.test(phone)) {
            messageDiv.innerHTML = "Số điện thoại không hợp lệ!";
            return;
        }
        if (!emailPattern.test(email)) {
            messageDiv.innerHTML = "Email không hợp lệ!";
            return;
        }
        if (!policyCheck) {
            messageDiv.innerHTML = "Bạn cần đồng ý với Chính sách và điều khoản để tiếp tục!";
            return;
        }

        messageDiv.classList.remove("text-danger");
        messageDiv.classList.add("text-success");
        messageDiv.innerHTML = "Đăng ký thành công!";
    });
});