const cachedColors: { [key: string]: string } = {};

async function extractColorsFromCSS(cssUrl: string): Promise<void> {
    try {
        if (Object.keys(cachedColors).length !== 0) {
            return;
        }

        const response = await fetch(cssUrl);
        const cssContent = await response.text();

        const variablePattern = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;

        let match;
        while ((match = variablePattern.exec(cssContent)) !== null) {
            const [, variableName, colorValue] = match;
            cachedColors[variableName] = colorValue.trim();
        }
    } catch (error) {
        console.error('Error fetching or parsing CSS:', error);
    }
}

extractColorsFromCSS('styles.css');

export default cachedColors;