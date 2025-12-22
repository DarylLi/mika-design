const fs = require('fs');
const path = require('path');

// 要统计的文件类型
const fileTypes = ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.scss'];

// 要排除的目录
const excludeDirs = ['__tests__', '__snapshots__', 'node_modules', '.git'];

function countLinesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').length;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return 0;
  }
}

function countLinesInDirectory(dirPath) {
  let totalLines = 0;
  let fileCount = 0;

  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        // 跳过排除的目录
        if (!excludeDirs.includes(item.name)) {
          const { lines, files } = countLinesInDirectory(fullPath);
          totalLines += lines;
          fileCount += files;
        }
      } else if (item.isFile()) {
        // 只统计指定类型的文件
        if (fileTypes.includes(path.extname(item.name))) {
          const lines = countLinesInFile(fullPath);
          totalLines += lines;
          fileCount++;
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
  }

  return { lines: totalLines, files: fileCount };
}

// 统计 components 目录下的代码行数
const componentsDir = path.join(__dirname, 'components');
const { lines, files } = countLinesInDirectory(componentsDir);

console.log(`统计结果：`);
console.log(`目录：${componentsDir}`);
console.log(`文件总数：${files} 个`);
console.log(`代码总行数：${lines} 行`);