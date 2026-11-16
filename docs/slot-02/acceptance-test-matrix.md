# Slot 2 Acceptance-Test Matrix

| Acceptance criterion | Unit | API/integration | Browser E2E |
|---|---|---|---|
| Valid title is trimmed and accepted | Shared Zod parse | POST returns 201 and persisted title | Create task and see it |
| Whitespace-only title is rejected | Shared Zod parse fails | POST returns 400 and row count is unchanged | Form disables submission |
| Title over 120 characters is rejected | Shared boundary test | POST returns 400 | Input has `maxlength=120` |
| Existing task can be edited | Update schema accepts title | PATCH returns updated task | Edit and observe new title |
| Completion is reversible | Boolean schema | PATCH true then false | Check then uncheck |
| Deletion removes the task | Not applicable | DELETE then GET returns 404 | Delete and observe empty state |

The matrix demonstrates the distinction between working behavior and verified behavior. A feature becomes verified only when the relevant acceptance evidence passes.
