import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import classes from "./ServiceCard.module.css";

const ServiceCard = () => {
  const imageUrls = [
    "https://s3-alpha-sig.figma.com/img/92f4/1145/e899be1c95738ba609f637bf8ca9dc98?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cn4Zexu1WKzyy33xSeZWaqjz1KWy6wUctVfrrjS9RSPWuQc222cXRQAzSBMNTM0EzVG~YA8vDRLNBh7zlsCUNA30P3R3P7yL4UzJujJrD3TgNwyCxKe9ToJrDDvyfLrUq0VS1zVt9T2xfzZrdTKyjNPYT-VhIPm4ojkGJCqmN~05eklBbKzRHn0coaaGCMD4FoL9CEKcV7C~-aBjRDElYZOa2jYwTaco0-Za-guTgZ5G4sK~zvZrs1wK7048Pbn81LzTjXko4ZtEi1VaPep64oIaxwu56uuOFBxVd-0o04rtSnsBZR8Ni2MXBZVIat8k2RPVTcxEx3YhlgBsovDcaQ__",
    "https://s3-alpha-sig.figma.com/img/a056/34f9/5cf86a07835d2c9f4f507213f3fbaf9b?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fnRYZ606icL4YfcAqNFJb9QajBrIguJXYcP1NY5XrUtvmFi8V0m5XC5CS1j3BiO4jdaRit8hJBfpSTW9xjFCbeYweqhP56iBRLXQ-ggtRM6l7riytMOerTkLtJlCodwtK6D5aTcHk0DMJ2gEx9T9G6bWQlCCAa2JOIh62jF5HXbX~tMkxZjtghTA3GUxxjafYXgVMp3M52kSItxC8fNYHmw4QDZh9nyUWiembx-3X1~DOrOh2GFEgLVKoKzEcDCa6NjLmoNkNsSLl3k6CjAliURYME9SrWzymyMOGohzy6ZfMnSM3Cosp1DChvMAgtfD-kbj1m4DCNXAFSIBchF~0w__",
  ];

  const randomImageUrl =
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <Card className={classes.card}>
      <div className={classes.overlay}>
        <Typography variant="h6" textAlign="center">
          Microsoft Teams
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        <img
          src={randomImageUrl}
          alt="Service Card Image"
          className={classes.image}
        />
      </div>
    </Card>
  );
};

export default ServiceCard;
