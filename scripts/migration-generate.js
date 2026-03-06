const { execSync } = require('child_process');

const name = process.argv[2];
if (!name) {
  console.error('Usage: npm run migration:generate <NombreMigracion>');
  process.exit(1);
}

execSync(
  `npx typeorm-ts-node-commonjs migration:generate -d src/config/data-source.ts src/database/migrations/${name}`,
  { stdio: 'inherit' },
);
