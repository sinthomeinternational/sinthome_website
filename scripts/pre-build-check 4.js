#!/usr/bin/env node

/**
 * Pre-build Check Script
 * Runs before build to ensure production readiness
 * Fails the build if critical issues are found
 */

import { config } from 'dotenv';
import { existsSync } from 'fs';

// Load environment variables
if (existsSync('.env')) {
  config();
}

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

let hasErrors = false;
const errors = [];
const warnings = [];

/**
 * Check if running in production mode
 */
const isProduction = process.env.NODE_ENV === 'production' ||
                     process.env.DEPLOYMENT_TARGET === 'custom' ||
                     process.env.VERCEL_ENV === 'production';

/**
 * Check for required form environment variables
 */
function checkFormConfiguration() {
  console.log(`${colors.blue}Checking Form Configuration...${colors.reset}`);

  const requiredFormVars = [
    'PUBLIC_CONTACT_FORM_ID',
    'PUBLIC_NEWSLETTER_FORM_ID',
    'PUBLIC_VOLUNTEER_FORM_ID',
    'PUBLIC_DONATION_FORM_ID',
  ];

  const optionalFormVars = [
    'PUBLIC_AI_HACKATHON_FORM_ID',
    'PUBLIC_WORKERS_ASSIST_FORM_ID',
    'PUBLIC_PLANTCORE_FORM_ID',
    'PUBLIC_SRTP_FORM_ID',
  ];

  // Check required forms
  for (const varName of requiredFormVars) {
    const value = process.env[varName];

    if (!value || value.includes('YOUR_')) {
      if (isProduction) {
        errors.push(`${colors.red}✗${colors.reset} CRITICAL: Missing required form configuration: ${varName}`);
        hasErrors = true;
      } else {
        warnings.push(`${colors.yellow}⚠${colors.reset} Development mode: ${varName} using placeholder`);
      }
    } else {
      console.log(`  ${colors.green}✓${colors.reset} ${varName} configured`);
    }
  }

  // Check optional forms (warn only)
  for (const varName of optionalFormVars) {
    const value = process.env[varName];

    if (!value || value.includes('YOUR_')) {
      warnings.push(`${colors.yellow}⚠${colors.reset} Optional form not configured: ${varName}`);
    } else {
      console.log(`  ${colors.green}✓${colors.reset} ${varName} configured`);
    }
  }
}

/**
 * Check deployment configuration
 */
function checkDeploymentConfig() {
  console.log(`\n${colors.blue}Checking Deployment Configuration...${colors.reset}`);

  const deploymentTarget = process.env.DEPLOYMENT_TARGET || 'github';
  console.log(`  Deployment target: ${deploymentTarget}`);

  if (deploymentTarget === 'custom' && !process.env.CUSTOM_DOMAIN) {
    warnings.push(`${colors.yellow}⚠${colors.reset} Custom deployment selected but CUSTOM_DOMAIN not set`);
  }
}

/**
 * Main check runner
 */
function main() {
  console.log(`\n${colors.blue}═══ Pre-Build Checks ═══${colors.reset}\n`);
  console.log(`Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}\n`);

  // Run all checks
  checkFormConfiguration();
  checkDeploymentConfig();

  // Display results
  console.log(`\n${colors.blue}═══ Results ═══${colors.reset}\n`);

  if (errors.length > 0) {
    console.log(`${colors.red}Errors (Build will fail):${colors.reset}`);
    errors.forEach(error => console.log(`  ${error}`));
  }

  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
    warnings.forEach(warning => console.log(`  ${warning}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`${colors.green}✓ All pre-build checks passed!${colors.reset}`);
  }

  // Exit with error code if production errors found
  if (hasErrors && isProduction) {
    console.log(`\n${colors.red}❌ Build failed: Critical errors found in production mode${colors.reset}`);
    process.exit(1);
  }

  // Success
  console.log(`\n${colors.green}✓ Pre-build checks complete${colors.reset}`);
  process.exit(0);
}

main();