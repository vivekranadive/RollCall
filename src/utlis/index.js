import { store } from "../store/store";

export const formatDate = (d) => {
    if (!d) { return ''; }
    const date = new Date(d);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export const mapToOption = (arr = [], key = null, valKey = null) => {
    if (key) {
        const optionArr = arr.map(i => ({ value: i[valKey || key], text: i[key] }));
        return [{ value: '', text: "--Choose an option--" }, ...optionArr]
    }

    return [
        { value: '', text: "--Choose an option--" },
        ...arr.map(i => ({ value: i, text: i }))]
}

export const getUserInfoDetails = () => {
    const data = store.getState();
    const userInfo = data.user.userInfo;
    return { companyId: userInfo.company, clientId: userInfo.client, ...userInfo }
}