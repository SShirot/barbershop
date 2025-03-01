import os

# Đường dẫn tới hai thư mục
hair_dir = 'E:/Nonhair/b'
nonhair_dir = 'E:/Nonhair/a'

# Đảm bảo đường dẫn tồn tại
if not os.path.exists(hair_dir):
    raise FileNotFoundError(f"Directory does not exist: {hair_dir}")
if not os.path.exists(nonhair_dir):
    raise FileNotFoundError(f"Directory does not exist: {nonhair_dir}")

# Chỉ định các định dạng tệp hợp lệ (nếu cần)
valid_extensions = ('.jpg', '.png')

# Lấy danh sách tệp từ folder 'hair' và 'nonhair'
hair_files = sorted([f for f in os.listdir(hair_dir) if f.endswith(valid_extensions)])
nonhair_files = sorted([f for f in os.listdir(nonhair_dir) if f.endswith(valid_extensions)])

# Tìm các tệp dư trong nonhair
hair_file_basenames = {os.path.splitext(f)[0] for f in hair_files}  # Chỉ lấy mã số
nonhair_file_basenames = {os.path.splitext(f)[0] for f in nonhair_files}

extra_nonhair_files = nonhair_file_basenames - hair_file_basenames

if extra_nonhair_files:
    print("Extra files in nonhair directory:")
    for extra_file in extra_nonhair_files:
        print(extra_file)

        # Đường dẫn đầy đủ của tệp
        full_path = os.path.join(nonhair_dir, extra_file + ".png")  # Thay '.jpg' bằng đúng extension

        # Kiểm tra file tồn tại trước khi xóa
        if os.path.exists(full_path):
            os.remove(full_path)
            print(f"Deleted: {full_path}")
        else:
            print(f"File not found, skipped: {full_path}")
else:
    print("No extra files found in nonhair directory.")