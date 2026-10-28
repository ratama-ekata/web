import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve as pathResolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';

export async function resolve(specifier, context, nextResolve) {
  let targetPath = null;

  if (specifier.startsWith('@/')) {
    const relativePath = specifier.replace('@/', './');
    targetPath = pathResolve(process.cwd(), relativePath);
  } else if (specifier.startsWith('./') || specifier.startsWith('../')) {
    if (context.parentURL) {
      const parentDir = dirname(fileURLToPath(context.parentURL));
      targetPath = pathResolve(parentDir, specifier);
    }
  }

  if (targetPath) {
    if (existsSync(targetPath + '.ts')) {
      return nextResolve(pathToFileURL(targetPath + '.ts').href, context);
    }
    if (existsSync(targetPath + '.tsx')) {
      return nextResolve(pathToFileURL(targetPath + '.tsx').href, context);
    }
    if (existsSync(pathResolve(targetPath, 'index.ts'))) {
      return nextResolve(pathToFileURL(pathResolve(targetPath, 'index.ts')).href, context);
    }
  }

  return nextResolve(specifier, context);
}
