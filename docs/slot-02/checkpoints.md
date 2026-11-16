# Slot 2 Reproducible Checkpoints

| Ref | Purpose | Expected state |
|---|---|---|
| `checkpoint/slot-02-start` | Approved P1.2 baseline for Slide 16 controlled planning | All P1.2 checks pass; no P2 changes |
| `training/slot-02-whitespace-red` | Dedicated red branch for Slide 25 | Shared and API whitespace tests fail for the validation-order defect |
| `training/slot-02-ci-failed` | Same intentional failure for Slide 28 CI investigation | CI reaches automated tests and fails for the whitespace regression |
| `checkpoint/slot-02-whitespace-red` | Annotated immutable red-state tag | Points to the failing regression commit; never merge |
| `checkpoint/slot-02-ready` | Final stable P2 teaching state | Created only after all mandatory local checks pass |

The red refs contain no secrets or production vulnerability. They contain one bounded functional defect and remain separate from the stable feature branch and `main`.
