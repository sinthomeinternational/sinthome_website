#!/usr/bin/env node

/**
 * Content Validation Script
 * Validates that all content collections have required frontmatter fields
 * and that form IDs are not placeholders
 */

import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'yaml';

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
 * Extract frontmatter from markdown file
 */
async function extractFrontmatter(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    return null;
  }

  try {
    return parse(match[1]);
  } catch (error) {
    errors.push(`${colors.red}✗${colors.reset} Failed to parse frontmatter in ${filePath}: ${error.message}`);
    hasErrors = true;
    return null;
  }
}

/**
 * Validate SRTP events
 */
async function validateSRTPEvents() {
  console.log(`${colors.blue}Validating SRTP Events...${colors.reset}`);

  const requiredFields = ['title', 'type', 'date', 'description', 'order'];
  const files = await glob('src/content/events/srtp/*.md');

  for (const file of files) {
    const frontmatter = await extractFrontmatter(file);
    if (!frontmatter) continue;

    for (const field of requiredFields) {
      if (!(field in frontmatter)) {
        errors.push(`${colors.red}✗${colors.reset} Missing required field '${field}' in ${path.basename(file)}`);
        hasErrors = true;
      }
    }

    // Validate type enum
    if (frontmatter.type && !['lecture', 'seminar', 'workshop'].includes(frontmatter.type)) {
      errors.push(`${colors.red}✗${colors.reset} Invalid type '${frontmatter.type}' in ${path.basename(file)}. Must be: lecture, seminar, or workshop`);
      hasErrors = true;
    }
  }

  console.log(`  Checked ${files.length} SRTP event files`);
}

/**
 * Validate articles
 */
async function validateArticles() {
  console.log(`${colors.blue}Validating Articles...${colors.reset}`);

  const requiredFields = ['title', 'snippet', 'category', 'pubDate'];
  const files = await glob('src/content/articles/**/*.md');

  for (const file of files) {
    const frontmatter = await extractFrontmatter(file);
    if (!frontmatter) continue;

    for (const field of requiredFields) {
      if (!(field in frontmatter)) {
        errors.push(`${colors.red}✗${colors.reset} Missing required field '${field}' in ${path.basename(file)}`);
        hasErrors = true;
      }
    }
  }

  console.log(`  Checked ${files.length} article files`);
}

/**
 * Check for placeholder form IDs in config
 */
async function validateFormConfig() {
  console.log(`${colors.blue}Validating Form Configuration...${colors.reset}`);

  const configPath = 'src/config/forms.ts';
  const content = await fs.readFile(configPath, 'utf-8');

  const placeholderPatterns = [
    'YOUR_',
    'PLACEHOLDER',
    'EXAMPLE',
    'TEST',
    'DEMO'
  ];

  let foundPlaceholders = false;
  for (const pattern of placeholderPatterns) {
    if (content.includes(pattern)) {
      warnings.push(`${colors.yellow}⚠${colors.reset} Found placeholder pattern '${pattern}' in forms.ts - remember to set actual form IDs in production`);
      foundPlaceholders = true;
    }
  }

  if (!foundPlaceholders) {
    console.log(`  ${colors.green}✓${colors.reset} No placeholder form IDs detected`);
  }
}

/**
 * Main validation runner
 */
async function main() {
  console.log(`\n${colors.blue}═══ Content Validation ═══${colors.reset}\n`);

  try {
    await validateSRTPEvents();
    await validateArticles();
    await validateFormConfig();

    console.log(`\n${colors.blue}═══ Results ═══${colors.reset}\n`);

    if (errors.length > 0) {
      console.log(`${colors.red}Errors:${colors.reset}`);
      errors.forEach(error => console.log(`  ${error}`));
    }

    if (warnings.length > 0) {
      console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
      warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`${colors.green}✓ All content validation checks passed!${colors.reset}`);
    }

    process.exit(hasErrors ? 1 : 0);
  } catch (error) {
    console.error(`${colors.red}Validation failed:${colors.reset}`, error);
    process.exit(1);
  }
}

main();