const stringToColor = (string: string): string => {
    let hash = 0;
    let color = '#';

    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, '0');
    }

    return color;
};

const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? '#000000' : '#ffffff';
};

const stringAvatar = (name: string): { sx: { bgcolor: string; color: string }, children: string } => {
    const [firstName, lastName] = name.split(' ');
    const bgColor = stringToColor(name);
    const color = getContrastColor(bgColor);

    return {
        sx: {
            bgcolor: bgColor,
            color: color,
        },
        children: `${firstName[0]}${lastName ? lastName[0] : ''}`,
    };
};

export default stringAvatar;

