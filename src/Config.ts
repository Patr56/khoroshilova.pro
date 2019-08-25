import {EPages} from "./Enums"

// Заглушка для моков.
export const REST_ACTIVE = false;

// Максимальное количество фотографиий в превью.
export const MAX_PHOTO_IN_ALBUM_PREVIEW = 5;

// Количество альбомов в линию.
export const ALBUM_IN_LINE= 4;

// Количество альбомов в линию.
export const SOCIAL_LINK__INSTAGRAM = "https://instagram.com/tatyanafoto89";
export const SOCIAL_LINK__VK = "https://vk.com/public171631266";

// Доступные страницы.
export const AVAILABLE_PAGES = {
    [EPages.BLOG] : false,
    [EPages.PHOTO] : false,
    [EPages.PRICE] : true,
    [EPages.PORTFOLIO] : true,
    [EPages.CONTACTS] : true,
}