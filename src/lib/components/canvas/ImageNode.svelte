<script lang="ts">
	import type { CanvasFlowNodeData } from '$lib/canvas';
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id, data }: NodeProps = $props();
	let nodeData = data as CanvasFlowNodeData;
</script>

<div class="image-node">
	<img src={nodeData.content} alt={nodeData.content} />
</div>
<Handle type="target" position={Position.Top} />
<Handle type="target" position={Position.Left} />
<Handle type="target" position={Position.Right} />
<Handle type="target" position={Position.Bottom} />
<Handle type="source" position={Position.Top} />
<Handle type="source" position={Position.Left} />
<Handle type="source" position={Position.Right} />
<Handle type="source" position={Position.Bottom} />
