const path = require('path')
const YAML = require('js-yaml')
const fse = require('fs-extra')
const { curryN } = require('ramda')
const isJsonPath = require('./isJsonPath')
const isYamlPath = require('./isYamlPath')

const formatContents = (filePath, contents, options) => {
  if (isJsonPath(filePath) && typeof contents !== 'string') {
    return JSON.stringify(contents, null, 2)
  }
  if (isYamlPath(filePath) && typeof contents !== 'string') {
    return YAML.dump(contents, options)
  }
  return contents
}

const writeFile = curryN(1, async (filePath, contents = '', options = {}) => {
  await fse.mkdirs(path.dirname(filePath))
  return fse.writeFile(filePath, formatContents(filePath, contents, options))
})

module.exports = writeFile
