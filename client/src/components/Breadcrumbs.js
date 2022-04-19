import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function SimpleBreadcrumbs({options, pageName}) {
    return (
        <Breadcrumbs separator=">" aria-label="breadcrumb" id="ariane">
            <Link color="inherit" href="/my-dashboard">
                Tableau de bord
            </Link>
            {options.items.map(({to, label}) => {
                return (
                    <Link href={to} key={label}>{label}</Link>
                );
            })}
            <Typography color="textPrimary">{pageName}</Typography>
        </Breadcrumbs>
    );
}