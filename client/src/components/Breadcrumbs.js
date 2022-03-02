import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function SimpleBreadcrumbs({options, pageName}) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
                Accueil
            </Link>
            {options.items.map(({ to, label }) => {
                return (
                    <div key={to} className="some-custom-classname">
                        <Link href={to}>{label}</Link>
                    </div>
                );
            })}
            <Typography color="textPrimary">{pageName}</Typography>
        </Breadcrumbs>
    );
}