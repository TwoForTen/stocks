import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

interface IpoCardProps {
  ipo: any;
}

const IpoCard: React.FC<IpoCardProps> = ({ ipo }) => {
  return (
    <>
      <Box paddingY={1}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">
              {ipo.symbol ? (
                <strong>{ipo.symbol}</strong>
              ) : (
                <i>Symbol Missing</i>
              )}
            </Typography>
            <Typography variant="overline">{ipo.status}</Typography>
          </Box>
          <Typography variant="caption" color="textSecondary">
            {ipo.name}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default IpoCard;
