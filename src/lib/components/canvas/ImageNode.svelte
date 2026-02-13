<script lang="ts">
	import type { CanvasFlowNodeData } from '$lib/canvas';
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { id, data }: NodeProps = $props();
	let nodeData = data as CanvasFlowNodeData;
</script>

<div class="image-node">
	<img src={nodeData.content} alt={nodeData.content} />
</div>
<Handle type="target" position={Position.Top} id="top" />
<Handle type="target" position={Position.Left} id="left" />
<Handle type="target" position={Position.Right} id="right" />
<Handle type="target" position={Position.Bottom} id="bottom" />
<Handle type="source" position={Position.Top} id="top" />
<Handle type="source" position={Position.Left} id="left" />
<Handle type="source" position={Position.Right} id="right" />
<Handle type="source" position={Position.Bottom} id="bottom" />
