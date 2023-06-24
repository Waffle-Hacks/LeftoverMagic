import { Typography } from '@mui/material';

const DescriptionBox = (props) => {
    const { title, description } = props;

    const fontTheme = {
        margin: '2.5%'
    }

    return (
        <div id='description'>
            <Typography variant='h5' sx={ fontTheme }>{title}</Typography>
            <Typography variant='body1' sx={ fontTheme }>{description}</Typography>
        </div>
    )
}

export default DescriptionBox;