-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 02, 2020 lúc 10:53 AM
-- Phiên bản máy phục vụ: 10.4.11-MariaDB
-- Phiên bản PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `qlbanhang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bao`
--

CREATE TABLE `bao` (
  `idbao` int(11) NOT NULL,
  `tieude` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noidung` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noidungchinh` text COLLATE utf8_unicode_ci NOT NULL,
  `ngaydang` date NOT NULL DEFAULT current_timestamp(),
  `slxem` int(11) NOT NULL,
  `slbinhluan` int(11) NOT NULL,
  `loaibao` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `idchuyenmuc` int(11) NOT NULL,
  `tacgia` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bao`
--

INSERT INTO `bao` (`idbao`, `tieude`, `noidung`, `noidungchinh`, `ngaydang`, `slxem`, `slbinhluan`, `loaibao`, `idchuyenmuc`, `tacgia`) VALUES
(1, 'báo nháp', 'tháng 9 này sinh viên 1760198 sẻ tốt nghiệp', '', '2020-07-01', 3, 3, 'dasdasdasdasdasdasda', 1, 'dasdasdasdasdasdasdasdasdasd'),
(2, 'báo nháp tiếp', 'sinh viên 1760265 sẻ rớt môn web', '', '2020-07-02', 31, 45, 'rweuiryweiu', 1, 'sgdfsgsdfgds');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baochoduyet`
--

CREATE TABLE `baochoduyet` (
  `idbaocd` int(11) NOT NULL,
  `tieudecd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noidungcd` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `noidungchinhcd` text COLLATE utf8_unicode_ci NOT NULL,
  `loaibaocd` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `idchuyenmuccd` int(11) NOT NULL,
  `nguoiviet` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binhluan`
--

CREATE TABLE `binhluan` (
  `idbinhluan` int(11) NOT NULL,
  `idbao` int(11) NOT NULL,
  `ngaydang` date NOT NULL DEFAULT current_timestamp(),
  `ten` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyenmuc`
--

CREATE TABLE `chuyenmuc` (
  `idchuyenmuc` int(11) NOT NULL,
  `idtheloai` int(11) NOT NULL,
  `tenchuyenmuc` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyenmuc`
--

INSERT INTO `chuyenmuc` (`idchuyenmuc`, `idtheloai`, `tenchuyenmuc`) VALUES
(1, 1, 'Trong Nước'),
(2, 2, 'Nông Sản'),
(3, 3, 'Game'),
(4, 1, 'Nước Ngoài'),
(5, 2, 'Thủy Sản'),
(6, 3, 'Điện Thoại');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaitaikhoan`
--

CREATE TABLE `loaitaikhoan` (
  `idloaitk` int(11) NOT NULL,
  `loaitk` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaitaikhoan`
--

INSERT INTO `loaitaikhoan` (`idloaitk`, `loaitk`) VALUES
(1, 'Người Dùng'),
(2, 'Người Dùng Vip'),
(3, 'Nhà Báo'),
(4, 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `idtk` int(11) NOT NULL,
  `taikhoan` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `matkhau` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ngaysinh` date NOT NULL,
  `loaitk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`idtk`, `taikhoan`, `matkhau`, `ten`, `email`, `ngaysinh`, `loaitk`) VALUES
(1, 'thong', '1234', 'tran duy thong', 'thonthon@gmail.com', '1996-01-31', 4),
(2, 'binh', '1234', 'nguyen thanh binh', 'binbin@gmail.com', '1999-02-14', 3),
(3, 'hieu', '1234', 'do cong hieu', 'hiuhiu@gmai.com', '1998-01-01', 2),
(4, 'thuan', '1234', 'nguyen minh thuan', 'thuthu@gmail.com', '1999-09-09', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `theloaibao`
--

CREATE TABLE `theloaibao` (
  `idtheloaibao` int(11) NOT NULL,
  `tentheloai` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `theloaibao`
--

INSERT INTO `theloaibao` (`idtheloaibao`, `tentheloai`) VALUES
(1, 'Thể Thao'),
(2, 'Kinh Doanh'),
(3, 'Công Nghệ');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bao`
--
ALTER TABLE `bao`
  ADD PRIMARY KEY (`idbao`);

--
-- Chỉ mục cho bảng `baochoduyet`
--
ALTER TABLE `baochoduyet`
  ADD PRIMARY KEY (`idbaocd`);

--
-- Chỉ mục cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  ADD PRIMARY KEY (`idbinhluan`);

--
-- Chỉ mục cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  ADD PRIMARY KEY (`idchuyenmuc`);

--
-- Chỉ mục cho bảng `loaitaikhoan`
--
ALTER TABLE `loaitaikhoan`
  ADD PRIMARY KEY (`idloaitk`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`idtk`);

--
-- Chỉ mục cho bảng `theloaibao`
--
ALTER TABLE `theloaibao`
  ADD PRIMARY KEY (`idtheloaibao`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bao`
--
ALTER TABLE `bao`
  MODIFY `idbao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `baochoduyet`
--
ALTER TABLE `baochoduyet`
  MODIFY `idbaocd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `idbinhluan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chuyenmuc`
--
ALTER TABLE `chuyenmuc`
  MODIFY `idchuyenmuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `loaitaikhoan`
--
ALTER TABLE `loaitaikhoan`
  MODIFY `idloaitk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `idtk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `theloaibao`
--
ALTER TABLE `theloaibao`
  MODIFY `idtheloaibao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
