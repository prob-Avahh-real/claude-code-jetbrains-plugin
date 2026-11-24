# claude-code-jetbrains-plugin（实验产物）

桌面 JetBrains IDE 插件 `0.1.14-beta` 解包 JAR 依赖快照（`experiments/`），仅用于本地协议与依赖结构分析，非独立源码工程。

## 用途与 Target 判定

| 平台 | 需要? | 方式 |
|------|-------|------|
| 移动端 | 不适用 | 桌面 JetBrains IDE 插件产物（`lib/*.jar`） |
| 智能硬件 | 不适用 | IDE 扩展包，无穿戴设备交互 |

## 命令

```bash
ls -lh lib/
jar tf lib/claude-code-jetbrains-plugin-0.1.14-beta.jar | head -n 40
```

## Harness / Loop（助手）

- 遵循根 `/Users/skat/AGENTS.md`：**Harness Engineering** + **Loop Engineering**
- 实验快照目录：通过 `tests/plugin.test.mjs` 校验解包 JAR 内 `META-INF/plugin.xml` 扩展点、Action 注册与运行时依赖完整性

## 验证环 / Done

```bash
npm test
```

**Done 示例**：`npm test` 通过（JAR 内 `plugin.xml`、核心 `.class` 与运行时依赖校验无误）。
