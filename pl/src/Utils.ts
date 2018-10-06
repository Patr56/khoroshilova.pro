import {IAlbum} from "./Models";

export function generate(count: number) {
    let res: IAlbum[] = [];
    for (let i = 0; i < count; i++) {
        res.push({
            id: i.toString(),
            name: "ВДНХ_" + i,
            photos: [
                {
                    id: "1",
                    name: "Первое изображение",
                    isCover: false,
                    url: {
                        original: "",
                        preview: ""
                    }
                },
                {
                    id: "2",
                    name: "Второе изображение",
                    isCover: false,
                    url: {
                        original: "",
                        preview: ""
                    }
                },
                {
                    id: "3",
                    name: "Третье изображение",
                    isCover: false,
                    url: {
                        original: "",
                        preview: ""
                    }
                },
                {
                    id: "4",
                    name: "Четвертое изображение",
                    isCover: true,
                    url: {
                        original: "",
                        preview: ""
                    }
                },
                {
                    id: "5",
                    name: "Пятое изображение",
                    isCover: false,
                    url: {
                        original: "",
                        preview: ""
                    }
                },
            ]
        })
    }
    return res;
}