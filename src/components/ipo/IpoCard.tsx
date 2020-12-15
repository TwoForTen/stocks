import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

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
              {ipo ? (
                <>
                  {ipo.symbol ? (
                    <strong>{ipo.symbol}</strong>
                  ) : (
                    <i>Symbol missing</i>
                  )}
                </>
              ) : (
                <Skeleton variant="text" animation="wave" width={30} />
              )}
            </Typography>
            <Typography variant="overline">
              {ipo ? (
                ipo.status
              ) : (
                <Skeleton variant="text" animation="wave" width={40} />
              )}
            </Typography>
          </Box>
          <Typography variant="caption" color="textSecondary">
            {ipo ? (
              ipo.name
            ) : (
              <Skeleton variant="text" animation="wave" width="40%" />
            )}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default IpoCard;
