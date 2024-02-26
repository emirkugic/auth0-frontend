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

const stringAvatar = (name: string): { sx: { bgcolor: string }, children: string } => {
    const [firstName, lastName] = name.split(' ');

    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${firstName[0]}${lastName ? lastName[0] : ''}`,
    };
};

export default stringAvatar;
