import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors,
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap',
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%',
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
    },
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%',
    },
  },
}));

function ProjectCard({ project, className, ...rest }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600],
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ExpansionPanel style={{ width: '100%' }} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary>
          <CardContent className={classes.content}>
            <div className={classes.header}>
              <Avatar
                alt="Author"
                className={classes.avatar}
                src={project.author.avatar}
              >
                {getInitials(project.author.name)}
              </Avatar>
              <div>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  noWrap
                  to="#"
                  variant="h5"
                >
                  {project.description}
                </Link>
                <Typography variant="body2">
                  by
                  {' '}
                  <Link
                    color="textPrimary"
                    component={RouterLink}
                    to="/management/customers/1"
                    variant="h6"
                  >
                    {project.author.name}
                  </Link>
                </Typography>
              </div>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">
                {project.totalFactoryCost}
              </Typography>
              <Typography variant="body2">toal factory cost</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">{project.supplier}</Typography>
              <Typography variant="body2">supplier</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">{project.receivingPort}</Typography>
              <Typography variant="body2">reveiving port</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">{project.checkNumber}</Typography>
              <Typography variant="body2">check number</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">{project.location}</Typography>
              <Typography variant="body2">location</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">
                {project.orderDate}
              </Typography>
              <Typography variant="body2">order date</Typography>
            </div>
            <div className={classes.stats}>
              <Typography variant="h6">
                {project.deliveryDate}

              </Typography>
              <Typography variant="body2">delivery date</Typography>
            </div>
            <div className={classes.stats}>
              <Typography
                style={{ color: statusColors[project.status] }}
                variant="h6"
              >
                {project.status}
              </Typography>
            </div>
            <div className={classes.actions}>
              <Button
                color="primary"
                size="small"
                variant="outlined"
              >
                View
              </Button>
            </div>
          </CardContent>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {project.comments}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
