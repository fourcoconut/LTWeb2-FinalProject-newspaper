-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 24, 2020 lúc 08:28 AM
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
  `tieude` text COLLATE utf8_unicode_ci NOT NULL,
  `ngaydang` date NOT NULL DEFAULT current_timestamp(),
  `slxem` int(11) NOT NULL,
  `slbinhluan` int(11) NOT NULL,
  `loaibao` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `idchuyenmuc` int(11) NOT NULL,
  `tacgia` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baochoduyet`
--

CREATE TABLE `baochoduyet` (
  `idbaocd` int(11) NOT NULL,
  `tieudecd` text COLLATE utf8_unicode_ci NOT NULL,
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
(2, 1, 'Nước Ngoài'),
(3, 2, 'Nông Sản'),
(4, 2, 'Thủy Sản'),
(5, 3, 'Game'),
(6, 3, 'Điện Thoại');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaitaikhoan`
--

CREATE TABLE `loaitaikhoan` (
  `idloaitk` int(11) NOT NULL,
  `loaitk` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  MODIFY `idbao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `binhluan`
--
ALTER TABLE `binhluan`
  MODIFY `idbinhluan` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
