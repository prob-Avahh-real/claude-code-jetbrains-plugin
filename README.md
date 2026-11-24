# claude-code-jetbrains-plugin（实验快照）

桌面 JetBrains IDE 插件 `claude-code-jetbrains-plugin`（`0.1.14-beta`）解包 JAR 依赖与协议结构分析快照（位于 `experiments/claude-code-jetbrains-plugin`）。

## 目录结构

- `lib/`：主插件 JAR（`claude-code-jetbrains-plugin-0.1.14-beta.jar`）及配套 Ktor / Kotlin 协程与序列化运行时 JAR
- `tests/plugin.test.mjs`：校验主插件与运行时 JAR 完整性、`META-INF/plugin.xml` 扩展点/Action 声明，以及 MCP WebSocket 传输层编译类存在性

## 目标平台（Target 判定）

- **移动端**：不适用（桌面 IntelliJ/JetBrains IDE 插件分析产物）
- **智能硬件**：不适用

## 快速检查与验证

```bash
# 查看插件包内容
jar tf lib/claude-code-jetbrains-plugin-0.1.14-beta.jar | head -n 40

# 运行插件包结构与描述符测试
npm test
```
