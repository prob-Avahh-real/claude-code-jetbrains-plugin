import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLUGIN_JAR = path.join(ROOT, 'lib/claude-code-jetbrains-plugin-0.1.14-beta.jar');

test('plugin distribution bundles main plugin JAR and required Ktor/Kotlin runtime JARs', () => {
  assert.ok(fs.existsSync(PLUGIN_JAR), 'main plugin JAR must exist');
  const jars = fs.readdirSync(path.join(ROOT, 'lib')).filter((n) => n.endsWith('.jar'));
  assert.ok(jars.length >= 20, `expected >=20 runtime JARs, got ${jars.length}`);
  for (const prefix of ['kotlin-stdlib-', 'ktor-server-websockets-jvm-', 'kotlinx-serialization-json-jvm-']) {
    assert.ok(jars.some((j) => j.startsWith(prefix)), `missing runtime dependency ${prefix}*`);
  }
});

test('META-INF/plugin.xml declares valid IntelliJ plugin ID, extensions, and Claude actions', () => {
  const pluginXml = execFileSync('unzip', ['-p', PLUGIN_JAR, 'META-INF/plugin.xml'], {
    encoding: 'utf8',
  });
  assert.match(pluginXml, /<id>com\.anthropic\.code\.plugin<\/id>/);
  assert.match(pluginXml, /<version>0\.1\.14-beta<\/version>/);
  assert.match(pluginXml, /<depends>com\.intellij\.modules\.platform<\/depends>/);
  assert.match(pluginXml, /com\.anthropic\.code\.plugin\.mcp\.tools\.DiffViewerExtension/);
  assert.match(pluginXml, /com\.anthropic\.code\.plugin\.actions\.SendToClaudeAction/);
  assert.match(pluginXml, /com\.anthropic\.code\.plugin\.actions\.OpenClaudeInTerminalAction/);
});

test('plugin JAR contains compiled action and MCP WebSocket transport classes matching plugin.xml', () => {
  const entries = execFileSync('unzip', ['-Z1', PLUGIN_JAR], { encoding: 'utf8' }).split('\n');
  const entrySet = new Set(entries);
  for (const requiredEntry of [
    'META-INF/plugin.xml',
    'META-INF/plugin-terminal.xml',
    'META-INF/pluginIcon.svg',
    'com/anthropic/code/plugin/actions/SendToClaudeAction.class',
    'com/anthropic/code/plugin/actions/OpenClaudeInTerminalAction.class',
    'com/anthropic/code/plugin/mcp/WebSocketMcpServerTransport.class',
  ]) {
    assert.ok(entrySet.has(requiredEntry), `missing JAR entry ${requiredEntry}`);
  }
});
