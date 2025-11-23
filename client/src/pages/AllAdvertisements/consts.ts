import type {SortBy, SortOrder} from "./types.ts";

export const SORT_OPTIONS: {
    label: string;
    sortBy: SortBy;
    sortOrder: SortOrder;
}[] = [
    { label: 'Сначала новые', sortBy: 'createdAt', sortOrder: 'desc' },
    { label: 'Сначала старые', sortBy: 'createdAt', sortOrder: 'asc' },

    { label: 'Цена по убыванию', sortBy: 'price', sortOrder: 'desc' },
    { label: 'Цена по возрастанию', sortBy: 'price', sortOrder: 'asc' },

    { label: 'Сначала срочные', sortBy: 'priority', sortOrder: 'desc' },
    { label: 'Сначала обычные', sortBy: 'priority', sortOrder: 'asc' },
];

export const STATUSES = ['pending', 'approved', 'rejected', 'draft'];


export const CATEGORIES = [
    { id: 0, name: 'Электроника' },
    { id: 1, name: 'Недвижимость' },
    { id: 2, name: 'Транспорт' },
    { id: 3, name: 'Работа' },
    { id: 4, name: 'Услуги' },
    { id: 5, name: 'Животные' },
    { id: 6, name: 'Мода' },
    { id: 7, name: 'Детское' },
]
