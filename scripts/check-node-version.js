const fs = require('fs');
const path = require('path');

// Read the required Node.js version from .nvmrc
const nvmrcPath = path.join(__dirname, '..', '.nvmrc');
const requiredVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();

// Get the current Node.js version
const currentVersion = process.version;

// Parse versions for comparison
const parseVersion = (version) => {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    throw new Error(`Invalid version format: ${version}`);
  }
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  };
};

try {
  const required = parseVersion(requiredVersion);
  const current = parseVersion(currentVersion);

  // Check if current version meets the requirement
  const isCompatible =
    current.major > required.major ||
    (current.major === required.major && current.minor > required.minor) ||
    (current.major === required.major &&
      current.minor === required.minor &&
      current.patch >= required.patch);

  if (!isCompatible) {
    console.error('\x1b[31m❌ Node.js version mismatch!\x1b[0m');
    console.error(`Required: ${requiredVersion}`);
    console.error(`Current:  ${currentVersion}`);
    console.error('\nTo fix this:');
    console.error('1. Install nvm (Node Version Manager)');
    console.error('2. Run: nvm install');
    console.error('3. Run: nvm use');
    console.error('4. Run: npm install');
    process.exit(1);
  }

  console.log(
    `\x1b[32m✅ Node.js version ${currentVersion} is compatible with required version ${requiredVersion}\x1b[0m`,
  );
} catch (error) {
  console.error(
    '\x1b[31m❌ Error checking Node.js version:\x1b[0m',
    error.message,
  );
  process.exit(1);
}
