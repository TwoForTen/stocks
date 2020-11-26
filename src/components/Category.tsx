import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  category: {
    textTransform: 'capitalize',
    padding: '0 5px',
    boxShadow: '0px 4px 9px rgba(180,90,255, 0.35)',
    minWidth: '60px',
  },
});

interface CategoryProps {
  label: string;
}

const Category: React.FC<CategoryProps> = ({ label }) => {
  const classes = useStyles();

  return (
    <Chip
      color="primary"
      className={classes.category}
      label={label}
      size="small"
    />
  );
};

export default Category;
